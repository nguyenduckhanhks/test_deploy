FROM node:14.15-alpine as frontend-stage

WORKDIR /var/www/html/frontend

COPY package.json package-lock.json ./

RUN npm install

COPY . .
