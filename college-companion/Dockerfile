# ----------- Build Stage -----------
FROM node:20-alpine AS builder

# Enable pnpm via Corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy only package manifest files for install caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies with pnpm
RUN pnpm install

# Copy remaining app source code
COPY . .

# Build the app (for Vite-based React apps)
RUN pnpm run build

# ----------- Serve Stage -----------
FROM node:20-alpine

WORKDIR /app

# Install and enable pnpm using Corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install a simple static file server
RUN pnpm add -g serve

# Copy built assets from the build stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist"]

