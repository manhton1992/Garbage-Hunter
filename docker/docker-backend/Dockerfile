FROM node:11

WORKDIR /usr/src/app/backend

COPY backend/package*.json ./

RUN npm ci

COPY backend/ .

RUN npm build

EXPOSE 3000

CMD ["npm", "start"]