FROM node:14-alpine as BUILD
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run ng -- build --configuration=production

FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=BUILD /usr/src/app/dist/GrillBotPublicClient /usr/share/nginx/html
