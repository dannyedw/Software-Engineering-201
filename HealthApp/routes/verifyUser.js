var express = require('express');
var router = express.Router();
var userManager = require('../model/userManager');

router.get('/', (req, res) => {
    if (req.session.user)
	{
		res.redirect('/userDashboard');
	}
	else res.render('verifyUser');
});

router.get('/:username', function (req, res, next) {
	if (req.session.user)
	{
		res.redirect('/userDashboard');
	}
	else
	{
		let response = userManager.addUser(req.params.username);
        if (response.status === 201)
        {
            req.session.regenerate((err) => {
                if (err) throw err;
                req.session.user = req.params.username;
                req.session.save((err) => {
                    if (err) throw err;
                    res.redirect('/userDashboard');
                });
            });
        }
        else res.status(response.status).json(response.content);
    }
});

module.exports = router;
