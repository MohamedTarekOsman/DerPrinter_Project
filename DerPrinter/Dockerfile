# Stage 1: Build Stage
FROM node:lts AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project directory and build the application
COPY . .
RUN npm run build

# Verify the build directory exists
RUN if [ -d "/app/dist" ]; then echo "Build directory exists"; else echo "Build directory does not exist"; fi


# Stage 2: Serve Stage
FROM nginx:latest

# Copy build artifacts to NGINX html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add SSL certificates (example for nginx-selfsigned or Let's Encrypt)
# Make sure to replace these with your actual certificate and key file paths
COPY ./ssl/nginx-selfsigned.crt /etc/nginx/ssl/nginx-selfsigned.crt
COPY ./ssl/nginx-selfsigned.key /etc/nginx/ssl/nginx-selfsigned.key

# Expose port 8000 for HTTPS
EXPOSE 8000

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
