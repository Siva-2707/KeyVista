variable "region" {
  description = "AWS region to deploy resources"
  default     = "us-east-1"
}

provider "aws" {
  region = var.region
}



# -------------------------------
# 1. VPC + Networking
# -------------------------------

resource "aws_vpc" "main_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = {
    Name = "main-vpc"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main_vpc.id
}

resource "aws_subnet" "public_subnet_1" {
  vpc_id                  = aws_vpc.main_vpc.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "us-east-1a"
  tags = { Name = "Public Subnet 1" }
}

resource "aws_subnet" "public_subnet_2" {
  vpc_id                  = aws_vpc.main_vpc.id
  cidr_block              = "10.0.4.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "us-east-1b"
  tags = { Name = "Public Subnet 2" }
}

resource "aws_subnet" "private_subnet_1" {
  vpc_id            = aws_vpc.main_vpc.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "us-east-1a"
  tags = { Name = "Private Backend Subnet 1" }
}

resource "aws_subnet" "private_subnet_2" {
  vpc_id            = aws_vpc.main_vpc.id
  cidr_block        = "10.0.5.0/24"
  availability_zone = "us-east-1b"
  tags = { Name = "Private Backend Subnet 2" }
}

resource "aws_subnet" "private_rds_subnet_1" {
  vpc_id            = aws_vpc.main_vpc.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = "us-east-1a"
  tags = { Name = "Private RDS Subnet 1" }
}

resource "aws_subnet" "private_rds_subnet_2" {
  vpc_id            = aws_vpc.main_vpc.id
  cidr_block        = "10.0.6.0/24"
  availability_zone = "us-east-1b"
  tags = { Name = "Private RDS Subnet 2" }
}

resource "aws_eip" "nat_eip" {
  domain = "vpc"
}

resource "aws_nat_gateway" "nat_gw" {
  allocation_id = aws_eip.nat_eip.id
  subnet_id     = aws_subnet.public_subnet_1.id
}

resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.main_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
}

resource "aws_route_table" "private_rt" {
  vpc_id = aws_vpc.main_vpc.id
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_gw.id
  }
}

resource "aws_route_table_association" "public_assoc_1" {
  subnet_id      = aws_subnet.public_subnet_1.id
  route_table_id = aws_route_table.public_rt.id
}

resource "aws_route_table_association" "public_assoc_2" {
  subnet_id      = aws_subnet.public_subnet_2.id
  route_table_id = aws_route_table.public_rt.id
}

resource "aws_route_table_association" "backend_assoc_1" {
  subnet_id      = aws_subnet.private_subnet_1.id
  route_table_id = aws_route_table.private_rt.id
}

resource "aws_route_table_association" "backend_assoc_2" {
  subnet_id      = aws_subnet.private_subnet_2.id
  route_table_id = aws_route_table.private_rt.id
}

resource "aws_route_table_association" "rds_assoc_1" {
  subnet_id      = aws_subnet.private_rds_subnet_1.id
  route_table_id = aws_route_table.private_rt.id
}

resource "aws_route_table_association" "rds_assoc_2" {
  subnet_id      = aws_subnet.private_rds_subnet_2.id
  route_table_id = aws_route_table.private_rt.id
}

# -------------------------------
# 2. Security Groups
# -------------------------------

resource "aws_security_group" "alb_sg_frontend" {
  name        = "frontend_asg_sg"
  description = "Security group for frontend ALB"
  vpc_id      = aws_vpc.main_vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "alb_sg_backend" {
  name        = "backend_asg_sg"
  description = "Security group for backend ALB"
  vpc_id      = aws_vpc.main_vpc.id

  ingress {
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    cidr_blocks     = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "rds_sg" {
  name        = "rds_sg"
  description = "Allow MySQL access from backend subnets"
  vpc_id      = aws_vpc.main_vpc.id

  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = [aws_vpc.main_vpc.cidr_block]  # Allow from entire VPC, or narrow down as needed
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# -------------------------------
# 3. AMI Data Source
# -------------------------------

data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]
  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}


# Using existing IAM role for lambda.
data "aws_iam_role" "lambda_exec_role" {
  name = "LabRole"
}

# IAM role profile to attach it to resources.
resource "aws_iam_instance_profile" "existing_profile" {
  name = "LabRoleProfile"
  role = data.aws_iam_role.lambda_exec_role.name
}
# -------------------------------
# 4. Frontend EC2 + AMI + ASG + ALB
# -------------------------------

resource "aws_security_group" "frontend_instance_sg" {
  name        = "frontend-instance-sg"
  description = "Security group for frontend EC2 instances"
  vpc_id      = aws_vpc.main_vpc.id

  ingress {
    from_port       = 80
    to_port         = 80
    protocol        = "tcp"
    security_groups = [aws_security_group.alb_sg_frontend.id]  # Allow ALB traffic
  }

  ingress {
    from_port = 22
    to_port   = 22
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow SSH access from anywhere (not recommended for production)
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Frontend ASG Instance SG"
  }
}

resource "aws_instance" "frontend_build" {
  ami                         = data.aws_ami.amazon_linux.id
  instance_type               = "t2.micro"
  subnet_id                   = aws_subnet.public_subnet_1.id
  associate_public_ip_address = true
  vpc_security_group_ids      = [aws_security_group.frontend_instance_sg.id]
  user_data_base64                   = base64encode(file("scripts/setup_frontend.sh"))
  tags = { Name = "frontend-build" }
}

resource "aws_ami_from_instance" "frontend_ami" {
  name               = "frontend-ami"
  source_instance_id = aws_instance.frontend_build.id
  depends_on         = [aws_instance.frontend_build]
}

resource "null_resource" "destroy_frontend_build" {
  triggers = { ami_id = aws_ami_from_instance.frontend_ami.id }
  provisioner "local-exec" {
    command = "aws ec2 terminate-instances --instance-ids ${aws_instance.frontend_build.id}"
  }
}

resource "aws_launch_template" "frontend_lt" {
  name_prefix   = "frontend-lt"
  image_id      = aws_ami_from_instance.frontend_ami.id
  instance_type = "t2.micro"
  vpc_security_group_ids = [aws_security_group.frontend_instance_sg.id]

  iam_instance_profile {
    name = aws_iam_instance_profile.existing_profile.name
  }

  user_data     = base64encode(<<-EOF
    #!/bin/bash
    sudo systemctl start docker

    # Install AWS CLI (if AMI doesn't include it)
    yum install -y aws-cli jq

    # Fetch secret from Secrets Manager
    secret=$(aws secretsmanager get-secret-value --region ${var.region} --secret-id keyvista/secrets --query SecretString --output text)
    api_url=$(echo $secret | jq -r '.backend_alb_endpoint')

    cd /opt/keyvista/frontend

    # Build Docker image
    sudo docker build -t keyvista-frontend .

    # Run container with environment variable
    sudo docker run -d -p 80:80 \
      -e VITE_BACKEND_URL="http://$api_url:8080" \
      keyvista-frontend

  EOF
  )
  depends_on = [aws_ami_from_instance.frontend_ami]
}

resource "aws_lb" "frontend_alb" {
  name               = "frontend-alb"
  internal           = false
  load_balancer_type = "application"
  subnets            = [aws_subnet.public_subnet_1.id, aws_subnet.public_subnet_2.id]
  security_groups    = [aws_security_group.alb_sg_frontend.id]
}

resource "aws_autoscaling_group" "frontend_asg" {
  desired_capacity    = 2
  max_size            = 10
  min_size            = 2
  vpc_zone_identifier = [aws_subnet.public_subnet_1.id, aws_subnet.public_subnet_2.id]

  launch_template {
    id      = aws_launch_template.frontend_lt.id
    version = "$Latest"
  }

  target_group_arns = [aws_lb_target_group.frontend_tg.arn]

  tag {
    key                 = "Name"
    value               = "frontend-asg-instance"
    propagate_at_launch = true
  }

  depends_on = [aws_lb.frontend_alb, aws_lb.backend_alb]
}

resource "aws_lb_target_group" "frontend_tg" {
  name     = "frontend-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.main_vpc.id
  target_type = "instance"
  health_check {
    path                = "/"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
    matcher             = "200"
  }
}

resource "aws_lb_listener" "frontend_listener" {
  load_balancer_arn = aws_lb.frontend_alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.frontend_tg.arn
  }
}



# -------------------------------
# 5. Backend EC2 + AMI + ASG + ALB
# -------------------------------

resource "aws_security_group" "backend_instance_sg" {
  name        = "backend-instance-sg"
  description = "Security group for backend EC2 instances"
  vpc_id      = aws_vpc.main_vpc.id

  ingress {
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.alb_sg_backend.id, aws_security_group.frontend_instance_sg.id, aws_security_group.alb_sg_frontend.id]  # Allow ALB traffic
  }

  ingress {
    from_port = 22
    to_port   = 22
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow SSH access from anywhere (not recommended for production)
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Backend ASG Instance SG"
  }
}

# resource "aws_instance" "backend_build" {
#   ami                         = data.aws_ami.amazon_linux.id
#   instance_type               = "t2.micro"
#   subnet_id                   = aws_subnet.private_subnet_1.id
#   associate_public_ip_address = true
#   vpc_security_group_ids      = [aws_security_group.backend_instance_sg.id]
#   user_data_base64                   =  base64encode(file("scripts/setup_frontend.sh"))
#   tags = { Name = "backend-build" }
# }

# resource "aws_ami_from_instance" "backend_ami" {
#   name               = "backend-ami"
#   source_instance_id = aws_instance.backend_build.id
#   depends_on         = [aws_instance.backend_build]
# }

# resource "null_resource" "destroy_backend_build" {
#   triggers = { ami_id = aws_ami_from_instance.backend_ami.id }
#   provisioner "local-exec" {
#     command = "aws ec2 terminate-instances --instance-ids ${aws_instance.backend_build.id}"
#   }
# }

resource "aws_launch_template" "backend_lt" {
  name_prefix   = "backend-lt"
  image_id      = aws_ami_from_instance.frontend_ami.id
  instance_type = "t2.micro"
  vpc_security_group_ids = [aws_security_group.backend_instance_sg.id]

  iam_instance_profile {
      name = aws_iam_instance_profile.existing_profile.name
  }

  user_data     = base64encode(<<-EOF
    #!/bin/bash
    sudo systemctl start docker
    cd /opt/keyvista/backend
    sudo docker build -t keyvista-backend .
    sudo docker run -d -p 8080:8080 --name keyvista-backend -e SPRING_PROFILE=aws keyvista-backend
  EOF
  )
}

resource "aws_lb" "backend_alb" {
  name               = "backend-alb"
  internal           = false
  load_balancer_type = "application"
  subnets            = [aws_subnet.public_subnet_1.id, aws_subnet.public_subnet_2.id]
  security_groups    = [aws_security_group.alb_sg_backend.id]
}

resource "aws_autoscaling_group" "backend_asg" {
  desired_capacity    = 2
  max_size            = 10
  min_size            = 2
  vpc_zone_identifier = [aws_subnet.private_subnet_1.id, aws_subnet.private_subnet_2.id]

  launch_template {
    id      = aws_launch_template.backend_lt.id
    version = "$Latest"
  }

  target_group_arns = [aws_lb_target_group.backend_tg.arn]

  tag{
    key                 = "Name"
    value               = "backend-asg-instance"
    propagate_at_launch = true
  }

  depends_on = [aws_lb.backend_alb, aws_secretsmanager_secret_version.app_secrets_with_db_url]
  
}


resource "aws_lb_target_group" "backend_tg" {
  name     = "backend-tg"
  port     = 8080
  protocol = "HTTP"
  vpc_id   = aws_vpc.main_vpc.id
  target_type = "instance"
  health_check {
    path                = "/"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
    matcher             = "200"
  }
}

resource "aws_lb_listener" "backend_listener" {
  load_balancer_arn = aws_lb.backend_alb.arn
  port              = 8080
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.backend_tg.arn
  }
}

# -------------------------------
# 6. RDS Multi-AZ Setup
# -------------------------------

resource "aws_db_subnet_group" "rds_subnet_group" {
  name       = "rds-subnet-group"
  subnet_ids = [aws_subnet.private_rds_subnet_1.id, aws_subnet.private_rds_subnet_2.id]
}

resource "aws_secretsmanager_secret" "app_secrets" {
  name = "keyvista/secrets"
}

resource "aws_sns_topic" "notification_topic" {
  name = "app-alerts"
}

resource "aws_secretsmanager_secret_version" "app_secrets_initial" {
  secret_id     = aws_secretsmanager_secret.app_secrets.id
  secret_string = jsonencode({
    "db_username"   = "root",
    "db_password"   = "SecurePass123#!",
    "frontend_alb_endpoint" = aws_lb.frontend_alb.dns_name,
    "backend_alb_endpoint"  = aws_lb.backend_alb.dns_name,
    "jwt_secret_key" = "pRTEdZpNZjQc/nzYEUOx7MxRfbDksjHZtgoZ9Nvmj/Gw9EJg/t0mx5+M44vRC181",
    "sns_topic_arn" = aws_sns_topic.notification_topic.arn
  })
  depends_on = [ aws_lb.backend_alb, aws_lb.frontend_alb ]
}

resource "aws_db_instance" "main_db" {
  identifier             = "keyvista-db"
  engine                 = "mysql"
  instance_class         = "db.t3.micro"
  multi_az               = true
  allocated_storage      = 20
  username               = jsondecode(aws_secretsmanager_secret_version.app_secrets_initial.secret_string)["db_username"]
  password               = jsondecode(aws_secretsmanager_secret_version.app_secrets_initial.secret_string)["db_password"]
  db_name                = "keyvista"
  db_subnet_group_name   = aws_db_subnet_group.rds_subnet_group.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  skip_final_snapshot    = true
  publicly_accessible    = false
  port                   = 3306
}

locals {
  jdbc_url = "jdbc:mysql://${aws_db_instance.main_db.address}:${aws_db_instance.main_db.port}/${aws_db_instance.main_db.db_name}?useSSL=false&allowPublicKeyRetrieval=true"
  frontend_alb_endpoint_url = "http://${aws_lb.frontend_alb.dns_name}:80"
}


resource "aws_secretsmanager_secret_version" "app_secrets_with_db_url" {
  secret_id     = aws_secretsmanager_secret.app_secrets.id
  secret_string = jsonencode({
   "db_username"   = "root",
    "db_password"   = "SecurePass123#!",
    "frontend_alb_endpoint" = local.frontend_alb_endpoint_url,
    "backend_alb_endpoint"  = aws_lb.backend_alb.dns_name,
    "jwt_secret_key" = "pRTEdZpNZjQc/nzYEUOx7MxRfbDksjHZtgoZ9Nvmj/Gw9EJg/t0mx5+M44vRC181",
    "db_url"        = local.jdbc_url,
    "sns_topic_arn" = aws_sns_topic.notification_topic.arn
  })
  depends_on = [aws_db_instance.main_db]
}

# -------------------------------
# 7. CloudWatch Monitoring
# -------------------------------

resource "aws_cloudwatch_dashboard" "main_dashboard" {
  dashboard_name = "keyvista-dashboard"
  dashboard_body = jsonencode({
    widgets = [
      {
        type       = "metric",
        x          = 0,
        y          = 0,
        width      = 24,
        height     = 6,
        properties = {
          metrics = [["AWS/EC2", "CPUUtilization", "InstanceId", "${aws_instance.frontend_build.id}"]],
          period  = 300,
          stat    = "Average",
          region  = "us-east-1",
          title   = "Frontend CPU Usage"
        }
      }
    ]
  })
}

resource "aws_cloudwatch_metric_alarm" "high_cpu_alarm" {
  alarm_name          = "high-cpu-frontend"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 1
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = 120
  statistic           = "Average"
  threshold           = 70
  alarm_description   = "This metric monitors high CPU usage on frontend instance"
  dimensions = {
    InstanceId = aws_instance.frontend_build.id
  }
  alarm_actions = [aws_sns_topic.notification_topic.arn]
}

resource "aws_cloudwatch_log_group" "frontend" {
  name              = "/ec2/frontend"
  retention_in_days = 14
}

resource "aws_cloudwatch_log_group" "backend" {
  name              = "/ec2/backend"
  retention_in_days = 14
}

# -------------------------------
# End of terraform configuration
# -------------------------------
