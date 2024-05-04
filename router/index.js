const router = require('express').Router();
require('express-async-errors');

router.use('/users', require('./users'));

module.exports = router;
