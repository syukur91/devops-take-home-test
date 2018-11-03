FROM node:10-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
## For npm@5 or later, copy package-lock.json as well
## COPY package.json package-lock.json ./

RUN npm install
## If you are building your code for production

# Bundle app source
COPY . .
COPY .env .


EXPOSE 3004
CMD [ "node", "app.js" ]
