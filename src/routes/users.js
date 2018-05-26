const router = require('express').Router();
const User = require('../models/users');

router.route('/register')
    .post((req, res) => {
        let user = new User(req.body);
        user.save(function (err) {
            if (err) {
                res.sendStatus(400);
            }else {
                res.sendStatus(201);
            }
          });
    });

module.exports = router;