const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');
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
    })
    .patch((req, res) => {
        if(req.user) {
            let id;
            try {
                id = mongoose.Types.ObjectId(req.params.id);
            } catch (error) {
                res.sendStatus(400);
            }
            /**
             * Reference:
             * https://docs.mongodb.com/manual/reference/operator/update/positional/
             */
            User.findOneAndUpdate(
                { 
                    _id: req.user._id,
                    'notes._id': id
                },
                {
                    $set: {
                        'notes.$.title': req.body.title,
                        'notes.$.body': req.body.body
                    }
                },{
                    new: true
                })
                .exec((err, user) => {
                    if(err || !user) {
                        res.sendStatus(400);
                    }else{
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
    })
    .delete((req, res) => {
        if(req.user) {
            let id;
            try {
                id = mongoose.Types.ObjectId(req.params.id);
            } catch (error) {
                res.sendStatus(400);
            }
            User.findOneAndUpdate(
                { 
                    _id: req.user._id,
                    'notes._id': id
                },
                {
                    $pull: {
                        notes: {
                            _id: id,
                        }
                    }
                },{
                    new: true
                })
                .exec((err, user) => {
                    if(err || !user) {
                        res.sendStatus(400);
                    }else{
                        let notes = user.notes;
                        let note = notes.find(n => { 
                            return n._id.toString() === req.params.id;
                        });
                        if(!note) {
                            res.sendStatus(200);
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