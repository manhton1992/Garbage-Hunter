FROM node:11 as node

WORKDIR /usr/src/app/frontend

COPY frontend/garbage-hunter-frontend/package*.json ./

RUN npm ci

COPY frontend/garbage-hunter-frontend .

RUN npm run build-prod

# Stage 2
FROM nginx

COPY --from=node /usr/src/app/frontend/dist/garbage-hunter-frontend /usr/share/nginx/html

COPY docker/docker-frontend/nginx.conf /etc/nginx/conf.d/default.conf
