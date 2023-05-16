var express = require('express');
var router = express.Router();
var groupManager = require("../model/groupManager");

router.get('/', (req, res) => {
    if (req.session.user)
	{
		res.redirect('/groupDashboard');
	}
	else res.redirect('/');
});

router.get('/:groupname', function (req, res, next) {
	if (req.session.user)
	{
		let response = groupManager.addPendingUser(req.session.user, req.params.groupname);
        if (response.status === 201)
        {
            res.redirect('/groupDashboard');
        }
        else
        {
            res.status(response.status).json(response.content);
        }
	}
	else
	{
        res.redirect('/');
    }
});

module.exports = router;
