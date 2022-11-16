FROM node:18-alpine

# Install backend dependencies
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm install

# Install frontend dependencies
WORKDIR /app/client
COPY client/*.json ./
COPY client/vite.config.ts ./
RUN npm install

# Add source code and build
WORKDIR /app
COPY . .
RUN npm run build

# Default port on server/index.js
EXPOSE 3001

# Execute pending migrations and start the app 🎉
CMD [ "sh", "-c", "npm run deploy" ]
