FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY user-service/package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY user-service/src ./src

# Build TypeScript
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]

