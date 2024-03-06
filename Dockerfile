# Use a lightweight Node.js image as a base
FROM node:14-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the built React application files
COPY build/ .

# Start a new stage to create a smaller production image
FROM nginx:alpine

# Copy the built React application from the previous stage
COPY --from=builder /app /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx server in the foreground when the container starts
CMD ["nginx", "-g", "daemon off;"]
