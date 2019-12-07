FROM node:latest
RUN mkdir -p /hackbnb/reviews-service/
WORKDIR /hackbnb/reviews-service/
COPY . /hackbnb/reviews-service/
RUN npm install
EXPOSE 3004
CMD npm run docker