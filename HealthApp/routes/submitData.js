var express = require('express');
var router = express.Router();
const dataReceiver = require('../model/dataReceiver');

router.post('/', function(req, res, next) {
  let result = dataReceiver.process(req.body);
  res.status(result.status).json(result.content);
  console.log(result.content);
});

module.exports = router;