const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const userRouter = require('./users');
const movieRouter = require('./movies');

router.post('/signup', createUser);
router.post('/signin', login);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

module.exports = router;
