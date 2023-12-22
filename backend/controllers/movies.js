const Movie = require('../models/movies');
const { BadRequestError } = require('../errors/BadRequestError');
const { AccessDeniedError } = require('../errors/AccessDeniedError');
const { NotFoundError } = require('../errors/NotFoundError');
const { STATUS_CODES } = require('../utils/constants');

const getMovie = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(STATUS_CODES.OK).send(movies))
    .catch(next);
};

const addMovie = (req, res, next) => {
  const {
    nameRU,
    nameEN,
    country,
    director,
    duration,
    description,
    image,
    trailerLink,
    year,
    movieId,
    thumbnail,
  } = req.body;

  return Movie.create({
    nameRU,
    nameEN,
    country,
    director,
    duration,
    description,
    image,
    trailerLink,
    year,
    movieId,
    thumbnail,
    owner: req.user._id,
  })
    .then((movie) => res.status(STATUS_CODES.CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError('Фильм не найден'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new AccessDeniedError('Нет прав для удаления');
      }
      Movie.findByIdAndRemove(req.params.movieId)
        .then(() => res.send({ message: 'Фильм удален' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports = {
  getMovie,
  addMovie,
  deleteMovie,
};
