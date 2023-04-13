var express = require('express');
var router = express.Router();
var userManager = require('../model/userManager')

/* GET login page. */
router.get('/', function (req, res, next) {
	if (req.session.user)
	{
		res.redirect('/userDashboard');
	}
	else
	{
		res.render('login', { title: 'Login' });
	}
});

router.post('/', (req, res) => {
	let response = userManager.login(req.body.content);
	if (response.status === 200)
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
