const router = require('express').Router();
const checktoken = require('../middlewares/checktoken');

// валидация полей запроса

const { createNewMember, getMyMembers, deleteMember } = require('../controllers/member');

router.post('/create', checktoken, createNewMember);
router.get('/family', checktoken, getMyMembers);
router.delete('/one/:_id', checktoken, deleteMember)

module.exports = router;
