const passport =  require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const keys = require('../config/keys')
const User = require('../models/User')


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

module.exports = passport => {
    passport.use(
        new jwtStrategy(options, async (payload, done) => {
            const user = await User.findById(payload.userId).select('email id')
            try {
                if(user) {
                    done(null, user)
                }
                else {
                    done(null, false)
                }
            } catch(e) {
                console.log(e);
            }
        })
    )
}