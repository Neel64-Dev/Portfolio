# Stage 1: Build the Vite React application
FROM node:22-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies deterministically
RUN npm ci --prefer-offline --no-audit

# Copy the rest of the application source code
COPY . .

# Web3Forms key is baked in at build time (Vite requirement)
ARG VITE_WEB3FORMS_KEY
ENV VITE_WEB3FORMS_KEY=$VITE_WEB3FORMS_KEY

# Build the application for production
RUN npm run build

# Stage 2: Serve the built app using Nginx
FROM nginx:alpine

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Install curl for container health checks
RUN apk add --no-cache curl

# Copy the build output from the builder stage to Nginx's default public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Health check for Docker container
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]