FROM node:boron

RUN mkdir node-mongo

ADD . /node-mongo
WORKDIR /node-mongo

COPY package*.json ./

RUN npm install
RUN npm install mocha -g

COPY . .

EXPOSE 3000

CMD ["npm", "start"]