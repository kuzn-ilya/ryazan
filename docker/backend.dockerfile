FROM node:10-alpine AS build
RUN apk add git automake autoconf build-base zlib-dev

USER node
WORKDIR /home/node
RUN git clone --depth=1 https://github.com/kuzn-ilya/ryazan.git

WORKDIR /home/node/ryazan/server
RUN sed -i 's/127.0.0.1/database/g' "./config/environments/development/database.json"
RUN yarn install
RUN yarn build

FROM node:10-slim
COPY --from=build /home/node/ryazan/server /home/node/app

USER node
WORKDIR /home/node/app
CMD ["yarn", "start"]
