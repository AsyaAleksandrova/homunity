const router = require('express').Router();
const checktoken = require('../middlewares/checktoken');

// валидация полей запроса

const { createNewMember, getMyMembers } = require('../controllers/member');

router.post('/create', checktoken, createNewMember);
router.get('/family', checktoken, getMyMembers);

module.exports = router;