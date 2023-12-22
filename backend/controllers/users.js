const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { BadRequestError } = require('../errors/BadRequestError');
const { ConflictError } = require('../errors/ConflictError');
const { NotFoundError } = require('../errors/NotFoundError');
const { STATUS_CODES } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET = 'JWT_SECRET' } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then(() => res.status(STATUS_CODES.CREATED)
      .send({
        name,
        email,
      }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при регистрации пользователя'));
      }
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь с таким электронным адресом уже зарегистрирован'));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  return User.findByIdAndUpdate(req.user._id, { email, name }, { new: true })
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => {
      res.status(STATUS_CODES.OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      }
      return next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  getCurrentUser,
  login,
  createUser,
  updateUser,
};
