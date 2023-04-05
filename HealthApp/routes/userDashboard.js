var express = require('express');
var router = express.Router();
var userManager = require('../model/userManager');

/* GET user dashboard page. */
router.get('/', function(req, res, next) {
  res.render('userDashboard', { title: 'User Dashboard' });
});

router.get('/data', (req, res) => {
  let result = userManager.dataRequest(req.body);
  res.status(result.status).json(result.content);
});

module.exports = router;
