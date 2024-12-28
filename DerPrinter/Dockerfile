FROM node:lts AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

RUN if [ -d "/app/dist" ]; then echo "Build directory exists"; else echo "Build directory does not exist"; fi


FROM nginx:latest

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]
