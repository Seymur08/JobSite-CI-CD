FROM node:18-alpine

WORKDIR /app-service-frontend

EXPOSE 5173

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev","--", "--host"]