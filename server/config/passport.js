const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('./config');

module.exports = function(passport) {
	const options = {
		jwtFromRequest: ExtractJwt.fromAuthHeader(),
		secretOrKey: config.secret
	};
	passport.use(new JwtStrategy(options, (jwt_payload, done) => {
		User.findOne({ id: jwt_payload.id }, (err, user) => {
			if (err) {
				return done(err, false);
			}
			if (user) {
				done(null, user);
			} else {
				done(null, false);
			}
		});
	}));
};