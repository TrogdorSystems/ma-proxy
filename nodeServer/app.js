const http = require('http');
const { fetch } = require('./fetch');
const serveHtml = require('./serveHtml');
const cache = require('./cache');


const tags = ['vegan', 'vegetarian', 'gluten-free'];

const app = http.createServer((request, response) => {
  const { method, url } = request;
  const [base, restaurantName, menu, meal, tag] = url.slice(1).split('/');

  if (method === 'GET') {
    if (base === '') {
      serveHtml(response);
    } else if (base === 'bundle.js') {
      const endpoint = `/${base}`;
      cache(response, endpoint);
    } else if (base === 'restaurants' && menu === 'menu' && !tag) {
      const endpoint = `/${base}/${restaurantName}/${menu}/${meal}`;
      fetch(response, endpoint);
    } else if (base === 'restaurants' && tags.includes(tag)) {
      const endpoint = `/${base}/${restaurantName}/${menu}/${meal}/${tag}`;
      fetch(response, endpoint);
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
