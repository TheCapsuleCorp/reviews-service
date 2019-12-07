const request = require('supertest');
const app = require('../server/app.js');

test('A get request to the ratings route returns json data', () => {
  request(app)
    .get('/rooms/18359884/ratings')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) {
        throw err;
      }
    });
});

test('A get request to the reviews route returns json data', () => {
  request(app)
    .get('/rooms/18359884/reviews')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) {
        throw err;
      }
    });
});
