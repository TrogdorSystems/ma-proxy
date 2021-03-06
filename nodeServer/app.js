const http = require('http');
const serveHtml = require('./serveHtml');
const cache = require('./cache');

const app = http.createServer((request, response) => {
  const { method, url } = request;
  const [base, restaurantName, service, meal, tag] = url.slice(1).split('/');
  if (method === 'GET') {
    if (base === '') {
      serveHtml(response);
    } else if (base === 'bundle.js' || base === 'restaurants') {
      cache(response, url, service);
    } else {
      response.statusCode = 404;
      response.end();
    }
  } else {
    response.statusCode = 404;
    response.end();
  }
});

module.exports = app;
