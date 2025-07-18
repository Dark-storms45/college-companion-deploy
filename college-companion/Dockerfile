# Use official Node image
FROM node:20-alpine AS builder

# Set working directory inside frontend folder
WORKDIR /app

# Copy package.json first for better layer caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy full project
COPY . .

# Ensure vite is executable
RUN chmod +x ./node_modules/.bin/vite

# Run build using full path
RUN ./node_modules/.bin/vite build

# -------------------
# Serve final build
# -------------------
FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app/dist ./dist

# Install static file server
RUN npm install -g serve

CMD ["serve", "-s", "dist"]
EXPOSE 3000
