#!/bin/bash./
aws secretsmanager restore-secret --secret-id keyvista/secrets
terraform import aws_secretsmanager_secret.app_secrets keyvista/secrets