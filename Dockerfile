FROM node:9-slim

WORKDIR /cyclops-backend

COPY . /cyclops-backend

RUN npm install

COPY . /cyclops-backend

EXPOSE 3000

CMD ["npm", "start"]
