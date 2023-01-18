FROM node:18.13.0-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn ci

COPY . .

RUN yarn build

RUN yarn prisma generate

EXPOSE 3333

ENV NODE_ENV=production

CMD [ "yarn", "start:migrate:prod" ]
