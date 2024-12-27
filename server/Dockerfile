FROM node:lts

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# Copy SSL certificates
COPY ssl/ /app/

EXPOSE 9000

CMD ["node", "index.js"]
