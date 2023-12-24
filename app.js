require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const { errors } = require('celebrate');
const helmet = require('helmet');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const limiter = require('./middlewares/rateLimiter');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const { URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const app = express();

mongoose
  .connect(URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('БД успешно подключена');
  })
  .catch(() => {
    console.log('Не удалось подключиться к БД, проверьте правильность подключения');
  });

app.use(express.json());

app.use(cors);

app.use(requestLogger);

app.use(helmet());

app.use(limiter);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
