var MathToys = require('../helpers/math');

function tri(req, res, next) {
  let toys = new MathToys;
  let triList = toys.getTriList(10);
  res.render('tri', { title: 'Triangular Numbers', tris: triList });
}

function dc(req, res, next) {
  let toys = new MathToys;
  // Get the denominator, or handle when there isn't one.
  let denom = req.params.denom || null;
  if (denom === null) {
    res.render('dc', { title: 'Decimal Calculator', rows: [] });
  } else {
    toys.dc(denom).then(data => {
      let rows = data;
      res.render('dc', { title: 'Decimal Calculator', rows: rows });
    });
  }
}

function phi(req, res, next) {
  let toys = new MathToys;
  let rows = req.params.rows || null;
  let title = 'Phi Powers';
  let sqrt5 = Math.pow(5, .5);
  if (rows === null) {
    res.render('phi', { title, rows: [] });
  } else {
    toys.phi(rows).then(data => {
      let rows = [];
      data.forEach(d => {
        d.variant = `(${d.phi_num.whole} + ${d.phi_num.sqrt_5_coef * sqrt5}) / ${d.denom}`;
		rows.push(d);
      });
      res.render('phi', { title, rows });
    });
  }
}

const endpoints = {
  dc: dc,
  phi: phi,
  tri: tri
}

module.exports = endpoints;
