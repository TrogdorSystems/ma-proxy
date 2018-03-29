const redisClient = require('./redisClient');
const { fetch, fetchBundle } = require('./fetch');

const cache = (response, endpoint, service) => {
  redisClient.get(endpoint, (err, data) => {
    if (data !== null && endpoint.includes('bundle')) {
      response.writeHead(200, { 'Content-Type': 'text/javascript' });
      response.end(JSON.parse(data));
    } else if (data !== null) {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(data);
    } else if (endpoint.includes('bundle')) {
      fetchBundle(response, endpoint, service);
    } else {
      fetch(response, endpoint, service);
    }
  });
};

module.exports = cache;
