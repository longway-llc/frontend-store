FROM node:15.10.0-alpine3.13

ARG env-file=.env.development
EXPOSE 3000

WORKDIR /app

COPY /app/package*.json .

RUN yarn

COPY /app .

CMD [ "yarn", "dev" ]

