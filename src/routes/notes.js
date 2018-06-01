const router = require('express').Router();
const User = require('../models/users');

router.route('/')
    .post((req, res) => {
        let filter = {
            email: req.body.email
        };
        User.findOne(filter)
            .exec((err, user) => {
                if(err) {
                    res.sendStatus(400);
                }else{
                    user.notes.push(req.body.note);
                    user.save(error => {
                        if(error) {
                            res.sendStatus(400);
                        }else{
                            let note_info = {
                                'id': user.notes[0]._id
                            };
                            res.status(201).json(note_info);
                        }
                    });
                }
            });
    })
    .get((req, res) => {
        User.findOne(req.body)
            .exec((err, user) => {
                if (err) {
                    res.sendStatus(400);
                } else {
                    res.json(user.notes);
                }
            });
    });

router.route('/:id')
    .get((req, res) => {
        /**
         * Solved using:
         * https://stackoverflow.com/questions/23467726/mongoose-find-a-nested-model
         */
        User.findOne(
            { 'notes._id': req.params.id }, 
            { 'notes.$': 1 }, 
            (err, user) => {
                if (err || !user || !user.notes || !user.notes.length) {
                    res.sendStatus(400);
                } else {
                    let note = user.notes[0];
                    res.json(note);
                }
            }
        );
    });

module.exports = router;