require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
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

app.listen(PORT, () => {
  console.log(`Сервер слушает ${PORT}`);
});
