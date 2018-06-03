const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/users');

require('dotenv').config();

router.route('/register')
    .post((req, res) => {
        let user = new User(req.body);
        user.save((err) => {
            if (err) {
                res.sendStatus(400);
            }else {
                res.sendStatus(201);
            }
        });
    });

router.route('/login')
    .post((req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        if (email && password) {
            let filter = {
                email: req.body.email
            };
            let fields = {
                email: true,
                password: true
            };
            User.findOne(filter)
                .select(fields)
                .exec((err, user) => {
                    if(err) {
                        res.sendStatus(204);
                    }else{
                        if (user.password === password) {
                            let payload = {
                                email: user.email
                            };
                            res.json({
                                token: jwt.sign(payload, process.env.JWT_SECRET)
                            });
                        } else {
                            res.sendStatus(401);
                        }
                    }
                });
        } else {
            res.sendStatus(401);
        }
    });

router.route('/profile')
    .all(passport.authenticate('jwt', { session: false }))
    .get((req, res) => {
        if(req.user) {
            let r = {
                'name': req.user.name,
                'email': req.user.email
            };
            res.json(r);
        }else{
            res.sendStatus(204);
        }
    })
    .patch((req, res) => {
        let valid_attr = {};
        if(req.body.name) {
            valid_attr.name = req.body.name;
        }
        if(req.body.email) {
            valid_attr.email = req.body.email;
        }
        if(req.body.password) {
            valid_attr.password = req.body.password;
        }
        User.findOneAndUpdate(
            { _id: req.user._id }, 
            valid_attr, 
            { new: true },
            (err, result) => {
                if (err || result.nModified === 0) {
                    res.sendStatus(204);
                }else {
                    let r = {
                        'name': result.name,
                        'email': result.email
                    };
                    res.json(r);
                }
            });
    });

module.exports = router;