const router = require('express').Router();
const { getMovie, addMovie, deleteMovie } = require('../controllers/movies');
const { movieValidation, movieIDValidation } = require('../middlewares/celebrateValidation');

router.get('/', getMovie);
router.post('/', movieValidation, addMovie);
router.delete('/:movieId', movieIDValidation, deleteMovie);

module.exports = router;
