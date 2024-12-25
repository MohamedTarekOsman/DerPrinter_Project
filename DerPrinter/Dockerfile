FROM node:18 AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application using Vite
RUN npm run build

# Verify the build directory
RUN if [ -d "/app/dist" ]; then echo "Build directory exists"; else echo "Build directory does not exist"; fi

# Serve the built app using Nginx
FROM nginx:alpine

# Copy the built app from the build stage to the Nginx HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
