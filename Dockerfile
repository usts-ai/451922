# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --force

# Copy all files
COPY . .

CMD ["npm", "run", "start:dev"]
