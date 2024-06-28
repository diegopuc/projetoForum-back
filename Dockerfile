# Use the official Node.js image from Docker Hub
FROM node:18.20.2

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
# COPY package*.json ./

# Install dependencies
# RUN npm install
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run your application
# CMD node node_modules/@nestjs/cli/bin/nest.js start --watch
CMD node dist/main