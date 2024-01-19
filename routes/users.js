// Файл маршрута users/me
const userRouter = require('express').Router();

const {
  getCurrentUserValidator,
  updateUserValidator,
} = require('../middlewares/validation');

const { getCurrentUser, updateUser } = require('../controllers/users');

userRouter.get('/users/me', getCurrentUserValidator, getCurrentUser);
userRouter.patch('/users/me', updateUserValidator, updateUser);

module.exports = userRouter;
