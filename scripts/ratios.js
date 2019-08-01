function lucasSequences(steps, start1, start2) {
  let lucasa = start1[0], lucasb = start1[1];
  let fiba = start2[0], fibb = start2[1];
  let result = [];

  for (let i = 2; i < steps; i++) {
    [lucasa, lucasb] = [lucasb, lucasa + lucasb];
    [fiba, fibb] = [fibb, fiba + fibb];
    result.push({ n: i, lucas: lucasb, fib: fibb, ratio: lucasb / fibb });
  }
  return result;
}

module.exports = lucasSequences;
