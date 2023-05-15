FROM node:12.22.12
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app
COPY assets/data.json /usr/src/app
EXPOSE 1337
CMD ["npm", "start", "populate.js"]