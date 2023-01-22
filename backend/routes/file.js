const router = require('express').Router();
const checktoken = require('../middlewares/checktoken');

// валидация файла??

const { uploadFile } = require('../controllers/file');

router.post('/upload/:parent', checktoken, uploadFile);

module.exports = router;