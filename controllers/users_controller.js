const User = require('../models/user')
const logger = require('../util/logger');

module.exports.profile = function (req, res) {
	return res.render('user_profile', {
		title: "User Profile Page"
	});
}

module.exports.showAll = function (req, res) {
	return res.send("<h1>Show All Users</h1>")
}

module.exports.signUp = function (req, res) {
	return res.render('user_sign_up', {
		title: 'We Soc | Sign Up'
	});
}

module.exports.signIn = function (req, res) {
	return res.render('user_sign_in', {
		title: 'We Soc | Sign In'
	});
}
const bodyToUser = ({ name, email, password }) => ({ name, email, password })
module.exports.create = function (req, res) {
	if (req.body.password !== req.body.confirm_password) {
		req.redirect('back');
	}
	const existingUser = User.findOne(
		{ email: req.body.email },
		(err, user) => {
			if (err) {
				logger.log(err, user);
				return;
			}
			if (!user) {
				User.create(bodyToUser(req.body), (err, user) => {
					if (err) {
						logger.log(err, user);
						return;
					}
					res.redirect('/users/sign-in');
				})
			}else{
				return res.redirect('back');
			}
		}
	);
}

module.exports.createSession = function (req, res) {
	return res.redirect('/');
}
module.exports.destroySession = function (req, res) {
	req.logout();
	return res.redirect('/users/sign-in');
}
