const axios = require('axios');
const redisClient = require('./redisClient');

const fetch = (response, endPoint) => axios
  .get(`http://ec2-54-67-41-26.us-west-1.compute.amazonaws.com${endPoint}`)
  .then(({ data }) => {
    const stringData = JSON.stringify(data);
    redisClient.setex(endPoint, 5, stringData);
    response.statusCode = 200;
    response.end(stringData);
  })
  .catch(() => {
    response.statusCode = 404;
    response.end();
  });

const fetchBundle = (response, endPoint) =>
  axios.get(`http://localhost:3005${endPoint}`)
    .then(({ data }) => {
      if (endPoint.includes('bundle')) {
        redisClient.setex(endPoint, 180, JSON.stringify(data));
      }
      response.writeHead(200, { 'Content-Type': 'text/javascript' });
      response.end(data);
    })
    .catch(() => {
      response.statusCode = 404;
      response.end();
    });

module.exports = {
  fetch,
  fetchBundle,
};
