FROM node:15.10.0-alpine3.13

EXPOSE 3000

WORKDIR /app

COPY /app/package*.json .

RUN yarn

COPY /app .


