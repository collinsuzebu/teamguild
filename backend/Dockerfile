FROM node:12-alpine

WORKDIR /usr/app

COPY ./package.json /usr/app/package.json

RUN rm -rf dist

RUN npm install -q

COPY . /usr/app/

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]