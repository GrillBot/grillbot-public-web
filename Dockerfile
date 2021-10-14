FROM node as BUILD
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run ng -- build --configuration=production

FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=BUILD /usr/src/app/dist/GrillBotClient /usr/share/nginx/html
