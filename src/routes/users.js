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
    .get((req, res) => {
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
            res.json(req.user);
        }else{
            res.sendStatus(204);
        }
    })
    .patch((req, res) => {
        User.findOneAndUpdate(
            { _id: req.user._id }, 
            req.body, 
            { new: true },
            (err, result) => {
                if (err || result.nModified === 0) {
                    res.sendStatus(204);
                }else {
                    res.json(result);
                }
            });
    });

module.exports = router;