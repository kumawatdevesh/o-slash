FROM node:12.18.3-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json .

RUN cd /app && npm install

COPY . /app

EXPOSE 5000

RUN npm install -g typescript

RUN tsc --build

ENTRYPOINT ["node", "./dist/index.js"]