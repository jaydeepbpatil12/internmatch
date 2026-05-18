FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the server source code
COPY . .

# Expose port 5000 for the backend API
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
