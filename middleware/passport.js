const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/keys');
const User = require('../models/User');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, (payload, done) => {
            try {
                User.findOne({
                    where: {
                        login: payload.login
                    }
                }).then(user => {
                    done(null, user);
                }).catch(error => {
                    console.log(error);
                    done(null, false);
                })
            } catch (error) {
                console.log(error);
            }
            
            
        })
    )
};
