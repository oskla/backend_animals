FROM node:16

WORKDIR /usr/app

COPY package.json /usr/app

RUN npm install

COPY . /usr/app/

CMD [ "npm", "run", "start-prod" ]