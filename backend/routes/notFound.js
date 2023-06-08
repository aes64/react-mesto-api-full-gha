const router = require('express').Router();

const { checkWay } = require('../controllers/notFound');

router.all('/*', checkWay);

module.exports = router;
