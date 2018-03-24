const axios = require('axios');
const redisClient = require('./redisClient');

const fetch = (response, endPoint) => axios
  .get(`http://localhost:3005${endPoint}`)
  .then(({ data }) => {
    const stringData = JSON.stringify(data);
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
      console.log('HI');
      const stringData = JSON.stringify(data);
      if (endPoint.includes('bundle')) {
        redisClient.setex(endPoint, 60, stringData);
      }
      response.statusCode = 200;
      response.writeHead(200, { 'Content-Type': 'text/javascript' });
      response.end(JSON.parse(stringData));
    })
    .catch(() => {
      response.statusCode = 404;
      response.end();
    });

module.exports = {
  fetch,
  fetchBundle,
};
