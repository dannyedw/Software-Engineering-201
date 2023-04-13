var express = require('express');
var router = express.Router();

/* GET user dashboard page. */
router.get('/', function(req, res, next) {
  if (req.session.user)
  {
    res.render('userDashboard', { title: 'User Dashboard' });
  }
  else
  {
    res.render('login', { title: 'Login' });
  }
});

module.exports = router;
