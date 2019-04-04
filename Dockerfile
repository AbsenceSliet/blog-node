FROM node
COPY . /app
WORKDIR /app
RUN yarn
EXPOSE 8080
CMD   pm2 server/start.js 