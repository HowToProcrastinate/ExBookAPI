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
                            res.sendStatus(201);
                        }
                    });
                }
            });
    });

module.exports = router;