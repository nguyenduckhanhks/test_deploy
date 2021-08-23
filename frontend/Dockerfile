FROM node:14.15-alpine as frontend-stage

WORKDIR /app

COPY . .

RUN yarn

RUN npm run build

CMD [ "npm", "start" ]
