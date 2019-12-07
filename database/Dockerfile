FROM node:latest
RUN mkdir -p /hackbnb/database
WORKDIR /hackbnb/database
COPY . /hackbnb/database
RUN npm install mongoose
RUN npm install fs
CMD ["node", "seed.js"]