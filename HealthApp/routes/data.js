var express = require('express');
var router = express.Router();
const dataManager = require('../model/dataManager');

router.get('/', (req, res, next) => {
    if (Object.keys(req.body).length == 0)
    {
        //user tried to navigate to the url as a normal page
        res.send(404);
    }
    else
    {
        let result = dataManager.request(req.body);
        res.status(result.status).json(result);
    }
});

router.post('/', (req, res) => {
    let result = dataManager.submit(req.body);
    res.status(result.status).json(result);
});

module.exports = router;
