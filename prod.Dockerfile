FROM node:15.10.0-alpine3.13

EXPOSE 3000

WORKDIR /app

ARG env-file=.env.production
ENV NODE_ENV=production

COPY /app/package*.json .

RUN yarn

COPY /app .

RUN [ "yarn", "build" ]

