FROM node:12.22.12
RUN mkdir -p /app
WORKDIR /app
COPY package*json /app/
RUN npm install
RUN npm install -g @angular/cli@11.2.0
COPY . /app
EXPOSE 4200
CMD ng serve --host 0.0.0.0 --disableHostCheck