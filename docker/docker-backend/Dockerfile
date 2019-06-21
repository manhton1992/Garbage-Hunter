FROM node:11

WORKDIR /usr/src/app/backend

COPY backend/package*.json ./

RUN npm ci

COPY backend/ .

EXPOSE 3000

CMD ["npm", "build"]

CMD ["npm", "start"]