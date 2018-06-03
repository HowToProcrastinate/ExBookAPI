const router = require('express').Router();
const notes = require('./notes');
const user = require('./users');

router.use('/', user);
router.use('/notes', notes);

module.exports = router;