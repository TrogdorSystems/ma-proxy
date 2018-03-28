FROM node:carbon

RUN mkdir /app

WORKDIR /app

ADD package.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]