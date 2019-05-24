var express = require('express');
var router = express.Router();
var mathToys = require('../helpers/math');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tri', function(req, res, next) {
  let triList = mathToys.getTriList(10);
  res.render('tri', { title: 'Triangular Numbers', tris: triList });
});

router.get('/dc', function(req, res, next) {
  mathToys.dc('d').then(data => {
    let rows = data;
    res.render('dc', { title: 'Decimal Calculator', rows: rows });
  });
});

module.exports = router;
