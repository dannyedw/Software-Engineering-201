var express = require('express');
var router = express.Router();
const dataManager = require('../model/dataManager');

router.post('/', (req, res) => {
    let result;
    if (!req.session.user) result = { status: 401, content: "User not logged in" };
    else
    {
        result = dataManager.request(req.session.user, req.body);
    }

    res.status(result.status).json(result);
});

module.exports = router;
