const router = require('express').Router();
const checktoken = require('../middlewares/checktoken');

// валидация полей запроса

const { createNewMember } = require('../controllers/member');

router.post('/create', checktoken, createNewMember);

module.exports = router;