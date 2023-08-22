# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY ./package*.json ./

# Install server dependencies
RUN npm install bcrypt
RUN npm install



# Copy all files from the server directory to the container
COPY ./ ./

CMD ["npm", "run", "start"]
