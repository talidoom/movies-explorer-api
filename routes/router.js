const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../errors/NotFoundError');
const { signinValidation, signupValidation } = require('../middlewares/celebrateValidation');

router.post('/signup', signinValidation, createUser);
router.post('/signin', signupValidation, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

module.exports = router;
