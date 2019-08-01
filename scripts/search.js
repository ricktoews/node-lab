const lucasSequences = require('./ratios.js');

const MAX_POWER = 10;
const BY_A_HAIR = .0000000001;

function getApproach(starta, startb) {
  let data = lucasSequences(40, starta, startb);
  let approaches = data[37].ratio;
  return approaches;
}

function detectWhole(approx) {
  let whole = Math.round(approx);
  let diff = Math.abs(whole - approx);
  let result = !!(diff < BY_A_HAIR);
  return result;
}

function checkPowers(approach) {
  let powers = [];
  let hasWhole = false;
  for (let i = 2; i <= MAX_POWER; i++) {
    let isWhole = detectWhole(approach**i);
    powers.push({ whole: isWhole, exponent: i, power: approach**i });
    if (isWhole) hasWhole = true;
  }
  return hasWhole ? powers : [];
}

const starts = [
  { a: [1, 3], b: [1, 1] },
  { a: [1, 4], b: [1, 1] },
  { a: [1, 5], b: [1, 1] },
  { a: [1, 6], b: [1, 1] },
  { a: [1, 7], b: [1, 1] },
  { a: [1, 8], b: [1, 1] },
  { a: [1, 9], b: [1, 1] },
  { a: [1, 5], b: [1, 3] },
  { a: [1, 6], b: [1, 3] },
  { a: [1, 7], b: [1, 3] },
  { a: [1, 8], b: [1, 3] },
  { a: [1, 9], b: [1, 3] },
];

let tries = 10;
starts.forEach(s => {
  let approach = getApproach(s.a, s.b);
  let powers = checkPowers(approach);
  console.log(powers);
});

