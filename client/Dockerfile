# Use an official Node.js runtime as the base image
FROM node:14 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY ./package*.json ./

# Install client dependencies
RUN npm install

# Copy all files from the client directory to the container
COPY ./ ./

# Build the React app
CMD ["npm", "run", "build"]
