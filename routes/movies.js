const router = require('express').Router();
const { getMovie, addMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovie);
router.post('/', addMovie);
router.delete('/:movieId', deleteMovie);

module.exports = router;
