# stage 1
FROM node:alpine as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# stage 2
FROM nginx:alpine
COPY --from=node /app/dist/ecommerce-front-end /usr/share/nginx/html