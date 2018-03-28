const redis = require('redis');

const REDIS_PORT = process.env.REDIS_PORT || 6379;

const redisClient = redis.createClient('redis://redis:6379');

module.exports = redisClient;
