const router = require('express').Router();
const User = require('../models/user');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/register', (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.json({success: false, message: 'Please enter username and password.'});
	}

	const newUser = new User({
		username,
		password
	});

	newUser.save((err) => {
		if (err) {
			return res.json({ success: false, message: 'That username already exists.' });
		}
		res.json({ success: true, message: 'Successfully created new user.' });
	});
});

router.post('/authenticate', (req, res) => {
	const { username, password } = req.body;

	User.findOne({ username }, (err, user) => {
		if (err) {
			return res.json({ success: false, message: 'Authentication failed. Database error.' });
		}
		if (!user) {
			return res.json({ success: false, message: 'Authentication failed. User not found.' });
		}

		user.comparePassword(password, (err, isMatch) => {
			if (isMatch && !err) {

				const token = jwt.sign(user, config.secret, {
					expiresIn: 1000000
				});

				res.json({
					success: true,
					token: 'JWT ' + token,
					message: 'Successfully authenticated',
					user: {
						id: user._id,
						username: user.username
					}
				});

			} else {
				res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
			}
		});
	});
});

router.get('/status', passport.authenticate('jwt', { session: false }), (req, res) => {
	if(!req.user) {
		res.json({ success: false, message: 'No auth token or token is invalid/expired' });
	} else {
		let { _id, username } = req.user;
		res.json({
			success: true,
			user: { id: _id, username },
			message: 'Valid token'
		});
	}
});

router.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.send('It worked! User id is: ' + req.user._id + '.');
});

module.exports = router;