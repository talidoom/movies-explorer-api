const router = require('express').Router();
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const userRouter = require('./users');
const movieRouter = require('./movies');

const {
  loginValidator,
  createUserValidator,
} = require('../middlewares/validation');

router.post('/signup', createUserValidator, createUser);

router.post('/signin', loginValidator, login);

router.use(auth);

router.use('/', userRouter);

router.use('/', movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
