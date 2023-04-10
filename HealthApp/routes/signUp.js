var express = require('express');
var router = express.Router();
var userManager = require('../model/userManager');

/* GET group sign up page. */
router.get('/', function(req, res, next) {
  res.render('signUp', { title: 'Sign Up' });
});

router.post('/', (req, res) => {
  console.log(req.body);
  let result = userManager.signup(req.body);
  res.status(result.status).json(result.content);
  console.log(result);
});

module.exports = router;
