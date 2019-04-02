FROM node:10-alpine

# create app directory
WORKDIR /usr/blog/server

# install
COPY server/package.json ./

RUN npm config set registry https://registry.npm.taobao.org && \
    npm install && \
    npm cache clean --force

COPY server .

EXPOSE 3000

CMD npm run dev