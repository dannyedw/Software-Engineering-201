var express = require('express');
var router = express.Router();

/* GET user dashboard page. */
router.get('/', function(req, res, next) {
  res.render('userDashboard', { title: 'User Dashboard' });
});

module.exports = router;
