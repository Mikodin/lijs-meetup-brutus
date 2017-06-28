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
    // console.log(jwtPayload._doc);
    const userInReq = jwtPayload._doc;
    User.findOne({ username: userInReq.username })
      .then((user) => {
        // console.log(user);
        user.isProperPassword(userInReq.password)
          .then((isProperPassword) => {
            console.log(isProperPassword);
            console.log(userInReq);
            return isProperPassword
              ? done(null, user)
              : done(null, false);
          });
      })
      .catch(error => done(error, false));
  }));
}

module.exports = initPassport;
