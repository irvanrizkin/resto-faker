# STAGE 1 : Build

FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npx prisma generate

RUN npm run build

CMD ["npm", "run", "start:prod"]
