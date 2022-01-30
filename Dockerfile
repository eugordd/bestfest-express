FROM node:16.7.0

WORKDIR /usr/src/app

RUN apt-get update
RUN apt-get install -y git

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

RUN git clone https://github.com/eugordd/bestfest-vue.git ./frontend
RUN yarn --cwd frontend
RUN yarn --cwd frontend build
RUN cp -a ./frontend/dist/. ./dist/

EXPOSE 3000

CMD ["yarn", "start"]

