# Base image
FROM devops-registry.ekenya.co.ke/configurable-ussd/configurable-ussd-backend-builder:latest as builder

# Bundle app source
COPY . .
RUN npm install prisma
RUN npx prisma generate
#RUN npx prisma migrate dev --name init

EXPOSE 3500

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/src/main.js" ]
