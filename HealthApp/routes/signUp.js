var express = require('express');
var router = express.Router();

/* GET group sign up page. */
router.get('/', function(req, res, next) {
  res.render('signUp', { title: 'Sign Up' });
});

module.exports = router;
