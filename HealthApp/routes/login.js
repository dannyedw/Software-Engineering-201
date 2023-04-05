var express = require('express');
var router = express.Router();
var userManager = require("../model/userManager");

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/', (req, res) => {
  let result = userManager.login(req.body);
  res.status(result.status).json(result.content);
});

module.exports = router;
