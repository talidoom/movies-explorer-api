const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Превышено количество запросов на сервер, попробуйте повторить позже',
});

module.exports = limiter;
