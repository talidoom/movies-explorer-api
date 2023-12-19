require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const router = require('./routes/router');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const raterLimiter = require('./middlewares/raterLimiter');
const { PORT: DEFAULT_PORT } = require('./utils/constants');

const { PORT = DEFAULT_PORT, MONGO_URL = 'MONGO_URL', NODE_ENV } = process.env;
const mongodb = 'mongodb://127.0.0.1:27017/bitfilmsdb';

const app = express();
app.use(cors());

mongoose
  .connect(NODE_ENV === 'production' ? MONGO_URL : mongodb)
  .then(() => console.log('БД подключена>'))
  .catch((err) => console.log(`Ошибка ${err} подключения к БД`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.use(requestLogger);

app.use(raterLimiter);
app.use(router);

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер слушает ${PORT}`);
});
