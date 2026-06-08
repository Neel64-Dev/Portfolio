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

# Railway injects PORT at runtime; default 80 for local Docker runs
ENV PORT=80

# Template is processed at startup so nginx listens on $PORT (required by Railway)
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Install curl for container health checks
RUN apk add --no-cache curl

# Copy the build output from the builder stage to Nginx's default public directory
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Health check uses the same port nginx binds to
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD sh -c 'curl -f "http://127.0.0.1:${PORT}/" || exit 1'

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]