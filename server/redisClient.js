// const redis = require('redis');

// const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
// const REDIS_PORT = process.env.REDIS_PORT || 6379;
// const REDIS_PASSWORD = process.env.REDIS_PASSWORD || '';

// const redisClient = redis.createClient({
//     host: REDIS_HOST,
//     port: REDIS_PORT,
//     password: REDIS_PASSWORD,
//     });

// redisClient.on('connect', () => {
//     console.log('Redis client connected');
// });

// redisClient.on('error', (err) => {
//     console.log('Redis not connected', err);
// });

// module.exports = redisClient;



const Redis = require('ioredis');

const redis = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
});

redis.on('connect', () => {
    console.log('Redis client connected');
});

redis.on('error', (err) => {
    console.log('Redis not connected', err);
});

module.exports = redis;


