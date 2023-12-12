FROM node:18-alpine

#create a app directory
WORKDIR /app

#install app and dependencies
COPY package*.json ./

#Run npm install
RUN npm install

#Bundle app source
COPY . .

EXPOSE 8080

# Run the "dev" script using npm
CMD ["npm", "run", "dev"]