# Dockerfile.dev
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Environment variable for Watchpack polling (useful for WSL/shared volumes)
ENV WATCHPACK_POLLING=true

# Expose Vite's default development server port
EXPOSE 5173

# Command to start the Vite development server
# CMD ["npm", "run", "dev"]

CMD ["npm", "run", "dev", "--", "--host"]
