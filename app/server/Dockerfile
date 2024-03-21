# Use official Node.js image as base
FROM node:14

# Create a directory for the Nest.js application
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Command to run the server
CMD ["npm", "run", "start:prod"]
