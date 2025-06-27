#!/bin/bash

set -e
# Update system
yum update -y

# Enable docker and install it
amazon-linux-extras enable docker
yum install -y docker git
systemctl enable docker
systemctl start docker

# Clone the repository
git clone https://github.com/Siva-2707/KeyVista.git /opt/keyvista

# # Create CloudWatch agent config file
# cat <<EOF > /opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json
# {
#   "logs": {
#     "logs_collected": {
#       "files": {
#         "collect_list": [
#           {
#             "file_path": "/var/lib/docker/containers/*/*-json.log",
#             "log_group_name": "/ec2/frontend",
#             "log_stream_name": "{instance_id}/frontend",
#             "timezone": "UTC"
#           },
#           {
#             "file_path": "/var/lib/docker/containers/*/*-json.log",
#             "log_group_name": "/ec2/backend",
#             "log_stream_name": "{instance_id}/backend",
#             "timezone": "UTC"
#           }
#         ]
#       }
#     }
#   }
# }
# EOF

# # Start CloudWatch agent
# /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
#   -a fetch-config \
#   -m ec2 \
#   -c file:/opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json \
#   -s