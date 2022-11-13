FROM node:18-alpine

# Copy repo code to the image
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Default port on server/index.js
EXPOSE 3001

# Execute pending migrations and start the app 🎉
CMD [ "sh", "-c", "npm run migrate-deploy && npm start" ]
