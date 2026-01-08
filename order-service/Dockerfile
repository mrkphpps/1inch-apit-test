FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY order-service/package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY order-service/src ./src

# Build TypeScript
RUN npm run build

EXPOSE 3002

CMD ["npm", "start"]

