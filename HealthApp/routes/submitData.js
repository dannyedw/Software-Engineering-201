var express = require('express');
var router = express.Router();
const dataReceiver = require('./model/dataReceiver');

/* GET group dashboard page. */
router.post('/submitData', function(req, res, next) {
  let result = dataReceiver.process(req.body);
  res.status(result.status).send(result.content);
});

module.exports = router;
