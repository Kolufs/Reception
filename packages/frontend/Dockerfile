FROM alpine:latest 

RUN apk add --no-cache yarn

WORKDIR /app
COPY . /app

RUN yarn install
RUN yarn global add serve
RUN export PATH="$(yarn global bin):$PATH"

CMD ["serve", "-S", "./dist"]