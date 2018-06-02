const router = require('express').Router();
const passport = require('passport');
const User = require('../models/users');

router.route('/')
    .all(passport.authenticate('jwt', { session: false }))
    .post((req, res) => {
        if(req.user) {
            User.findOne({ _id: req.user._id })
                .exec((err, user) => {
                    if(err) {
                        res.sendStatus(400);
                    }else{
                        user.notes.push(req.body);
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
        }else {
            res.sendStatus(403);
        }
    })
    .get((req, res) => {
        if(req.user) {
            User.findOne({ _id: req.user._id })
                .exec((err, user) => {
                    if (err) {
                        res.sendStatus(400);
                    } else {
                        res.json(user.notes);
                    }
                });
        }else {
            res.sendStatus(403);
        }
    });

router.route('/:id')
    .all(passport.authenticate('jwt', { session: false }))
    .get((req, res) => {
        if(req.user) {
            User.findOne({ _id: req.user._id })
                .exec((err, user) => {
                    if (err) {
                        res.sendStatus(400);
                    } else {
                        let notes = user.notes;
                        let note = notes.find(n => { 
                            return n._id.toString() === req.params.id;
                        });
                        if(note) {
                            res.json(note);
                        }else {
                            res.sendStatus(400);
                        }
                    }
                });
        }else {
            res.sendStatus(403);
        }
    });

module.exports = router;