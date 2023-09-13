FROM node:18-alpine as builder


WORKDIR /app
COPY package.json yarn.lock ./
RUN apk add --update --no-cache 

RUN yarn install --ignore-scripts

COPY . .
RUN yarn install --production --ignore-scripts --prefer-offline
RUN yarn remove bcrypt && yarn add bcrypt
RUN yarn build 

FROM node:18-alpine as runner

RUN apk add --no-cache tzdata
ENV TZ=Asia/Ho_Chi_Minh
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime

RUN --mount=type=secret,id=PORT \
    export PORT=$(cat /run/secrets/PORT) 

WORKDIR /app
RUN apk add --update --no-cache 
RUN addgroup -g 1001 appgroup
RUN adduser -D -u 1001 appuser -G appgroup
RUN chown -R appuser:appgroup /app

USER appuser

COPY --from=builder --chown=appuser:appgroup /app/ ./


EXPOSE ${PORT}
CMD [ "yarn", "start:prod" ]
