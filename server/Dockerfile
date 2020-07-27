FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY TODO/ ./node_modules/TODO

COPY . .

EXPOSE 8081
CMD [ "npm", "start" ]