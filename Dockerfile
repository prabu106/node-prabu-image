FROM node:18-alpine

WORKDIR /sample-node-app

COPY . /sample-node-app/

EXPOSE 8000

RUN npm install

CMD ["npm", "start"]