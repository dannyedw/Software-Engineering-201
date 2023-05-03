var express = require('express');
var router = express.Router();

/* GET group dashboard page. */
router.get('/', function (req, res, next) {
	if (req.session.user)
	{
		res.render('groupDashboard', { title: 'Group Dashboard', username: req.session.user });
	}
	else
	{
		res.render('login', { title: 'Login' });
	}
});

module.exports = router;
