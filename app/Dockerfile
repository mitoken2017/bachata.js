FROM node:10.15

ENV APP_ROOT /src

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}

COPY package.json .
RUN npm install

ADD . ${APP_ROOT}

# RUN npm ci
RUN npm run build

#EXPOSE 3000
ENV HOST 0.0.0.0
