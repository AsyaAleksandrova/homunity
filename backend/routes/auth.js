const router = require('express').Router();
const checktoken = require('../middlewares/checktoken');
const validateNewUser = require('../middlewares/validateNewUser');
const validateAuth = require('../middlewares/validateAuth');

const { login, logout, createUser, confirmEmail, refreshlink, getidbylink, refreshpass, getMyUser } =
  require('../controllers/auth');


router.post('/signup', validateNewUser, createUser);
router.get('/activate/:link', confirmEmail)
router.post('/login', validateAuth, login);
router.delete('/logout', checktoken, logout);
router.patch('/refresh/link', refreshlink);
router.patch('/refresh/pass/:_id', validateAuth, refreshpass);
router.get('/refresh/pass/:link', getidbylink);
router.get('/profile/:id', checktoken, getMyUser);

module.exports = router;