const router = require('express').Router();
const Note = require('../models/note');

router.route('/')
    .post((req, res) => {
        Note.add(res, req.body);
    })
    .get((req, res) => {
        Note.list(res);
    });

router.route('/:id')
    .get((req, res) => {
        Note.get(res, req.params.id);
    })
    .patch((req, res) => {
        Note.patch(res, req.params.id, req.body);
    })
    .delete((req, res) => {
        Note.remove(res, req.params.id);
    });

module.exports = router;