const Movie = require('../models/movie');
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
    .catch((err) => next(err));
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then(() => {
      Movie.findByIdAndRemove(req.params.movieId)
        .then(() => res.send({ message: 'Удалено' }))
        .catch(next);
    })
    .catch((err) => next(err));
};

module.exports = {
  getMovie,
  addMovie,
  deleteMovie,
};
