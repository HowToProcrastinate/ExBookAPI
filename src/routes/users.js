const router = require('express').Router();
const User = require('../models/users');

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

router.route('/profile')
    .get((req, res) => {
        let filter = {
            email: req.body.email
        }
        let fields = {
            name: true,
            email: true,
            password: true
        };
        User.findOne(filter)
            .select(fields)
            .exec((err, result) => {
                if(err){
                    res.sendStatus(204);
                }else{
                    res.json(result);
                }
            });
    })
    .patch((req, res) => {
        let params = req.body;
        User.findOneAndUpdate({ email: params.email }, params, { new: true },(err, result) => {
            if (err || result.nModified === 0) {
                res.sendStatus(204);
            }else {
                res.json(result);
            }
        });
    });

module.exports = router;