const router = require('express').Router();
const Note = require('../models/note');

router.get('/', function (req, res) {
    Note.list(res);
});

router.post('/', function (req, res) {
    Note.add(res, req.body);
});

router.get('/:id', function (req, res) {
    Note.get(res, req.params.id);
});

router.patch('/:id', function (req, res) {
    Note.patch(res, req.params.id, req.body);
});

module.exports = router;