const User = require('../models/user')
const logger = require('../util/logger');

module.exports.profile = function (req, res) {
	let id = req.cookies.user_id;
	if(!id) return res.redirect('/users/sign-in')
	User.findOne({_id:id}, (err, user)=>{
		if(err){
			logger.err(err);
			return;
		}
		if(!user){
			res.redirect('/users/sign-in');
		}
		return res.render('user_profile', {
			title: "User Profile Page",
			user
		});
	})

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
	User.findOne(
		{ email: req.body.email },
		(err, user) => {
			if (err) {
				logger.log(err, user);
				return;
			}
			if(user){
				if(user.password !== req.body.password){
					return res.redirect('back');
				}
				res.cookie('user_id', user.id)
				return res.redirect('/users/profile');
			}	else {
				return res.redirect('back');
			}
		}
	);
}

module.exports.signOut = (req, res)=>{
	res.clearCookie('user_id');
	res.redirect('back')
}