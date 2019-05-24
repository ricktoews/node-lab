var MathToys = require('../helpers/math');

function tri(req, res, next) {
  let toys = new MathToys;
  let triList = toys.getTriList(10);
  res.render('tri', { title: 'Triangular Numbers', tris: triList });
}

function dc(req, res, next) {
  let toys = new MathToys;
  toys.dc(req.params.denom).then(data => {
    let rows = data;
    res.render('dc', { title: 'Decimal Calculator', rows: rows });
  });
}

const endpoints = {
  dc: dc,
  tri: tri
}

module.exports = endpoints;
