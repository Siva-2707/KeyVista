# Build React app
FROM node:20-alpine as builder

WORKDIR /app
COPY . .
RUN npm install && npm run build

# Serve with NGINX
FROM nginx:alpine

# Copy built React app
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx template
COPY nginx.conf.template /etc/nginx/templates/nginx.conf.template

# Use entrypoint script to replace placeholder
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
