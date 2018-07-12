FROM node:10.4.0
COPY package*.json ./
RUN npm install && apt-get update && apt-get install -y vim
COPY  . .
EXPOSE 4000
CMD ["npm", "start"]