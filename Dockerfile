# Description: Dockerfile for the NODEJS application
# Author: César Perez

# Use the official image as a parent image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json /app/

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the application code to the working directory
COPY src /app/src

# Expose the port the app runs on - CONTAINER_PORT
EXPOSE 4000 5000 6000

# Define environment variables
# Modificar archivo : pg_hba.conf en la carpeta /var/lib/postgresql/data/pg_hba.conf
ENV DB_USER=postgres
ENV DB_PASSWORD=123456
ENV DB_HOST=192.168.1.22
ENV DB_PORT=5432
ENV DB_DATABASE=nodepg
ENV PORT=4000

# Run the application
#CMD ["node", "src/index.js"]
CMD npm start