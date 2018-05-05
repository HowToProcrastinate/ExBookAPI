const router = require('express').Router();
const Note = require('../models/note');

router.get('/', function (req, res) {
    Note.list(res);
});

router.get('/:id', function (req, res) {
    Note.get(res, req.params.id);
});

router.post('/', function (req, res) {
    Note.add(res, req.body);
});

module.exports = router;