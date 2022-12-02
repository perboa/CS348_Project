#step 1: build react frontend
FROM node:16-alpine as build-step
WORKDIR /app
ENV PATH /app/node_modules/.bin:%$PATH
COPY package.json yarn.lock babel-plugin-macros.config.js babel.config.js tailwind.config.js ./
COPY ./src ./src
COPY ./public ./public
RUN yarn install
RUN yarn build

#step 2: build nginx container
FROM nginx:stable-alpine
COPY --from=build-step /app/build /usr/share/nginx/html
COPY deployment/nginx.default.conf /etc/nginx/conf.d/default.conf