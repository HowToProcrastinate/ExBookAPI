const router = require('express').Router();
const Note = require('../models/note');

router.get('/', function (req, res){
    res.send(Note.list());
});

router.get('/:id', function (req, res){
    let note = Note.get(req.params.id);
    if(note === -1){
        res.sendStatus(404);
    }else{
        res.send(note);
    }
});

router.post('/', function (req, res){
    res.send('Nota agregada satisfactoriamente');
});

module.exports = router;