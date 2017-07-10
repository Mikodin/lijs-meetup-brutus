const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user.model');
const { tokenSecret } = require('./main.config');

function initPassport(passport) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: tokenSecret,
  };

  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    User.findOne({ id: jwtPayload._id })
      .then((user) => {
        return user
          ? done(null, user)
          : done(null, false);
      })
      .catch(error => done(error, false));
  }));
}

module.exports = initPassport;
