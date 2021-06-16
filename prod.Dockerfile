FROM node:lts-alpine3.10

EXPOSE 3000

WORKDIR /app

ARG env-file=.env.production

COPY /app/package*.json .

RUN yarn

COPY /app .

RUN [ "yarn", "build" ]

