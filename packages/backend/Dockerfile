FROM alpine:latest

RUN apk add --no-cache yarn 

WORKDIR /app
COPY . /app

RUN yarn install 

CMD ["yarn", "start"]

