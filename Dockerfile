# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies using legacy-peer-deps
RUN npm install --legacy-peer-deps

# Copy the entire project to the container
COPY . .

# Expose the port
EXPOSE 3001

# Start the React app
CMD ["npm", "run", "start"]
