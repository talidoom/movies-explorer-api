const router = require('express').Router();
const { getCurrentUser, updateUser } = require('../controllers/users');
const { userValidation } = require('../../middlewares/celebrateValidation');

router.patch('/me', userValidation, updateUser);
router.get('/me', getCurrentUser);

module.exports = router;
