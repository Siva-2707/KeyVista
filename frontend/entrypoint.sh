#!/bin/sh

# Replace placeholder with actual value
BACKEND_URL=${VITE_BACKEND_URL:-http://localhost:8080}

echo "Replacing backend URL with: $BACKEND_URL"
envsubst '$BACKEND_URL' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"
