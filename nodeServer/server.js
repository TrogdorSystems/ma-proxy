const redisClient = require('./redisClient');
const app = require('./app');

app.listen(3009, () => console.log('LISTENING -------> 3009'));
