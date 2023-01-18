const router = require('express').Router();
const checktoken = require('../middlewares/checktoken');
const validateNewUser = require('../middlewares/validateNewUser');
const validateAuth = require('../middlewares/validateAuth');

const { login, logout, createUser, confirmEmail, refreshlink, refreshpass, getMyUser } =
  require('../controllers/users');


router.post('/signup', validateNewUser, createUser);
router.get('/activate/:link', confirmEmail)
router.post('/login', validateAuth, login);
router.delete('/logout', checktoken, logout);
router.patch('/refresh/link', refreshlink);
router.patch('/refresh/pass/:link', refreshpass)
router.use('/profile/:id', checktoken, getMyUser);

module.exports = router;