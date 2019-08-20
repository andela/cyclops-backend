FROM node:9-slim
WORKDIR /cyclops-backend
COPY . /cyclops-backend
RUN npm install
COPY . /cyclops-backend
CMD ["npm", "start"]
EXPOSE 3000
