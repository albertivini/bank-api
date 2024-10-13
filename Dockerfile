## Build

FROM node:20.17.0-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
COPY prisma ./prisma/

RUN yarn install

RUN npx prisma generate

COPY . .

RUN yarn tsc

## Run

FROM node:20.17.0-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "dist/src/server.js"]