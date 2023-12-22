const { celebrate, Joi } = require('celebrate');
const { urlRegexPattern } = require('../utils/constants');

const userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});

const movieValidation = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    image: Joi.string().required().regex(urlRegexPattern),
    movieId: Joi.number().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    trailerLink: Joi.string().required().regex(urlRegexPattern),
    thumbnail: Joi.string().required().regex(urlRegexPattern),
  }),
});

const movieIDValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().required().length(24),
  }),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

module.exports = {
  userValidation,
  movieValidation,
  movieIDValidation,
  signinValidation,
  signupValidation,
};
