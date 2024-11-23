# Description: Dockerfile for the NODEJS application
# Author: César Perez

# Use the official image as a parent image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json /app/
#COPY .env ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the application code to the working directory
COPY src /app/src

# Expose the port the app runs on - CONTAINER_PORT
EXPOSE 4000 5000 6000

# Define environment variables
# Modificar archivo : pg_hba.conf en la carpeta /var/lib/postgresql/data/pg_hba.conf
# ENV DB_USER=${DB_USER}
# ENV DB_PASSWORD=${DB_PASSWORD}
# ENV DB_HOST=${DB_HOST}
# ENV DB_PORT=${DB_PORT}
# ENV DB_DATABASE=${DB_DATABASE}
# ENV PORT=${DB_PORT}

# Run the application
#CMD ["node", "src/index.js"]
CMD npm start