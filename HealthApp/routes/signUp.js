var express = require('express');
var router = express.Router();
var userManager = require('../model/userManager');

router.get('/', function (req, res, next) {
	if (req.session.user)
	{
		res.redirect('/userDashboard');
	}
	else
	{
		res.render('signUp', { title: 'SignUp' });
	}
});

router.post('/', (req, res) => {
	let response = userManager.signup(req.body.content);
	if (response.status === 201)
	{
		req.session.regenerate((err) => {
			if (err) throw err;
			req.session.user = req.body.content.username;
			req.session.save((err) => {
				if (err) throw err;
				res.redirect('/userDashboard');
			});
		});
	}
	else res.status(response.status).json(response.content);
});

module.exports = router;
