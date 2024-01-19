const movieRouter = require('express').Router();
const { addMovieValidator, deleteMovieValidator } = require('../middlewares/validation');
const {
  getMovies, addMovie, deleteMovie,
} = require('../controllers/movies');

movieRouter.get('/movies', getMovies);

movieRouter.post('/movies', addMovieValidator, addMovie);

movieRouter.delete('/movies/:movieId', deleteMovieValidator, deleteMovie);

module.exports = movieRouter;
