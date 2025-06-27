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