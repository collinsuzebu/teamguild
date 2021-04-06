FROM node:12-alpine as build

WORKDIR /usr/app

COPY ./package.json /usr/app/package.json

RUN rm -rf dist

RUN npm install -q

COPY . /usr/app/

RUN npm run build


# nginx multi-build stage
FROM nginx

EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/build /usr/share/nginx/html

# CMD ["npm", "start"]