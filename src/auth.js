const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/users');
require('dotenv').config();

module.exports = () => {
    let opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    };
    
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        let filter = {
            email: jwt_payload.email
        };
        let fields = {
            name: true,
            email: true,
            password: true
        };
        User.findOne(filter)
            .select(fields)
            .exec((err, result) => {
                if(err) {
                    return done(null, false);
                }else{
                    return done(null, result);
                }
            });
    }));
};
