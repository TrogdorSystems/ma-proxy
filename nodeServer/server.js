require('newrelic');
const serviceList = require('./getServerBundles');
const redisClient = require('./redisClient');
const app = require('./app');

app.listen(4000, () => console.log('LISTENING -------> 4000'));
