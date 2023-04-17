var express = require('express');
var router = express.Router();

/* GET group dashboard page. */
router.get('/', function(req, res, next) {
  res.render('groupDashboard', { title: 'Group Dashboard', username: req.session.user });
});

module.exports = router;
