# Base image: Node 24 on Alpine Linux (tiny Linux, keeps the image small)
FROM node:24-alpine

# Create /app inside the container and run all following commands from there
WORKDIR /app

# Copy only the package files first, so the npm ci layer is cached
# and only re-runs when dependencies change (not on every code edit)
COPY package.json package-lock.json ./

# Install exact versions from package-lock.json (strict, repeatable install)
RUN npm ci

# Copy the rest of the source code (.dockerignore skips node_modules, dist, uploads)
COPY . .

# Compile TypeScript (src/) into JavaScript (dist/) at build time
RUN npm run build

# Documents that the app listens on port 3000 (docker run -p actually opens it)
EXPOSE 3000

# Runs when the container starts (not at build time): node dist/index.js
CMD ["npm", "start"]
