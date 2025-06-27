#!/bin/sh

# Default if not passed explicitly
BACKEND_URL=${VITE_BACKEND_URL:-http://localhost:8080}
echo "Replacing backend URL with: $BACKEND_URL"

# Inject env var into nginx config
envsubst '$BACKEND_URL' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/conf.d/default.conf

echo "Final NGINX config:"
cat /etc/nginx/conf.d/default.conf

exec "$@"
