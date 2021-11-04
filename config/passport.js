// reads the JWT from the http Authorization header with the scheme 'bearer':
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = require("./keys_dev").SECRET;
module.exports = (passport) =>
  passport.use(
    // jwt_payload contains the decoded JWT payload
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findOne({ _id: jwt_payload.id }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
