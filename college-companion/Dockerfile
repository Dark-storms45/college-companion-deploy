# ----------- Build Stage -----------
FROM node:20-alpine AS builder

WORKDIR /app

# Cache dependencies install
COPY package*.json ./
RUN npm install

# Copy remaining app files
COPY . .

# Run build (Vite, React, etc.)
RUN npm run build

# ----------- Serve Stage -----------
FROM node:20-alpine

WORKDIR /app

# Copy only the built assets
COPY --from=builder /app/dist ./dist

# Install static server
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "dist"]
