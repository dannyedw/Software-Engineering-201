var express = require('express');
var router = express.Router();
var personalGoalManager = require("../model/groupGoalManager")
var userManager = require("../model/userManager");

router.get('/', (req, res) => {
    if (req.session.user)
	{
		res.redirect('/userDashboard');
	}
	else res.redirect('/');
});

router.get('/:groupName/:goalId', function (req, res, next) {
	if (req.session.user)
	{
        //gets user's current weight
        let userReq = userManager.dataRequest(req.session.user, {requestKeys: ["weight"]})
        let weightKeys = Object.keys(userReq.content.weight);

        weight = userReq.content.weight[weightKeys[weightKeys.length - 1]]

        let content = {
            groupName: req.params.groupName,
            goalId: req.params.goalId,
            startWeight: weight
        }
		let response = personalGoalManager.addUser(req.session.user, content)
        if (response.status === 200)
        {
            res.redirect('/groupDashboard');
        }
        else
        {
            console.log(response.content);
            res.redirect('/groupDashboard');
        }
	}
	else
	{
        res.redirect('/');
    }
});

module.exports = router;
