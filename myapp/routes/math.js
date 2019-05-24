var express = require('express');
var router = express.Router();
var endpoints = require('../api-handlers/endpoints');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/tri', endpoints.tri);

router.get('/dc/:denom', endpoints.dc);

module.exports = router;
