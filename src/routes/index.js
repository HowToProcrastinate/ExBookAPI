const router = require('express').Router();
// const notes = require('./notes');
const user = require('./users');

router.use('/', user);

module.exports = router;