# Use an official Node.js runtime as the base image
FROM node:12.2.0-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY ./package*.json ./

# Install client dependencies
RUN npm install

# Copy all files from the client directory to the container
COPY . .

# Build the React app
RUN npm run build

FROM nginx
EXPOSE 3000
# Use an official Nginx runtime as the base image
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html