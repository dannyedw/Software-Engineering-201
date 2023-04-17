var express = require('express');
var router = express.Router();

/* GET group dashboard page. */
router.get('/', function(req, res, next) {
  res.render('about', { title: 'About', username: req.session.user });
});

module.exports = router;
