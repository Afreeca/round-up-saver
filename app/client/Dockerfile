# Use official Node.js image as base for building the React app
FROM node:14 as build

# Set the working directory in the container
WORKDIR /app/client

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Use Nginx as base image to serve the React app
FROM nginx:alpine

# Copy the built React app from the previous stage to Nginx's default HTML directory
COPY --from=build /app/client/build /usr/share/nginx/html

# Expose application port 80 (Nginx default)
EXPOSE 80

# Nginx will automatically start serving the React app from port 80
