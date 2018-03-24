const redisClient = require('./redisClient');
const { fetchBundle } = require('./fetch');

const cache = (response, endpoint) => {
  redisClient.get(endpoint, (err, data) => {
    if (data !== null) {
      response.statusCode = 200;
      response.writeHead(200, { 'Content-Type': 'text/javascript' });
      response.end(JSON.parse(data));
    } else {
      fetchBundle(response, endpoint);
    }
  });
};

module.exports = cache;
