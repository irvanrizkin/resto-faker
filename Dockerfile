# STAGE 1 : Build

FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# STAGE 2 : Running

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

COPY .env ./

RUN npm install --only=production

RUN npm prisma generate

CMD ["npm", "run", "start:prod"]
