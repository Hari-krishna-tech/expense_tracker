FROM node:alpine

# Create app directory as a working directory inside the container
WORKDIR /app

# need for copying files from the package.json package-lock.json is speed up the build process
COPY package.json ./
COPY package-lock.json ./
# Copy all the files from the current directory to the working directory inside the container
COPY ./ ./
# Install all the dependencies
RUN npm i
# run the command to start the server
CMD ["npm", "run", "start"]