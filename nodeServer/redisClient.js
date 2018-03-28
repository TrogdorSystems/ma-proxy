const redis = require('redis');

const REDIS_PORT = process.env.REDIS_PORT || 6379;

const redisClient = redis.createClient('redis://redis:6379');

redisClient.on('connect', () => console.log('CONNECTED TO REDIS'));

module.exports = redisClient;
