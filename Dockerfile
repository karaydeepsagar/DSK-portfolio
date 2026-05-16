# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

# Set production environment
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Copy package.json and lock files
COPY package*.json ./

# Install dependencies - use npm ci for reproducible builds
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Create non-root user for security
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# Copy build output with proper ownership
COPY --from=build --chown=appuser:appgroup /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Switch to non-root user
USER appuser

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]