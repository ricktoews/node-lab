// Return array of odd squares.
function getCorners() {
  var corners = [2];
  for (let i = 1; i < 10; i+=2) {
    corners.push(i*i);
  }
  return corners;
}

// Return values for a and b, given a corner of 2.
/*
 * b^2 = 2*2 + 2*(2*a)
 *     = 4 + 4a
 *     = 4*(1 + a)
 * Since b is even, a is odd for any primitive.
 * Since 4 is square, (1 + a) is also square.
 * Therefore, a is an even square minus 1.
 */
function calc_a_b_even(corner) {
  var evenSquares = [4, 16, 36, 64, 100, 144, 196, 256, 324, 400];
  var aList = evenSquares.map(sq => sq - 1);
  var tripleList = aList.map(a => {
    let b = Math.pow(4 * (1 + a), .5);
	let c = Math.pow(a*a + b*b, .5);
	return [a, b, c];
  });
  return tripleList;
}

// Return values for a and b, given an odd square as the corner.
/*
 * b^2 = n*n + 2*a*n
 *     = n*(n + 2a)
 * Since (n + 2a) is a square greater than n, 2a is the difference between two consecutive odd squares.
 */
function calc_a_b_odd(corner) {
  var sqrt = Math.pow(corner, .5);
  var tripleList = [];
  for (let i = 1; i <= 10; i++) {
    let sq = Math.pow(corner + 2*i, 2);
	let a = (sq - corner) / 2;
	let b = Math.pow(corner*sq, .5);
	let c = Math.pow(a*a + b*b, .5)
	tripleList.push([a, b, c].sort());
  }
  return tripleList;
}

// Return 10 Pythagorean Triples for a specified corner.
function getTriples(corner) {
  var triple;
  if (corner % 2 === 0) {
    triple = calc_a_b_even(corner);
  } else {
    triple = calc_a_b_odd(corner);
  }
  return triple; 
}

var corners = getCorners();
corners.forEach(corner => {
  var triples = [];
  triples.push(getTriples(corner));
  console.log(corner, triples);
});
