var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

function factor(x) {
	var factors = [];
	var ceil = Math.floor(x / 2);
	primes.forEach((p) => {
		if (p <= ceil) {
			while (x % p === 0) {
				factors.push(p);
				x = x / p;
			}
		}
	});

	return factors;
}

function gcf(a, b) {
	var ints = [a, b];

	var finished = false;
	while (!finished) {
		ints = [Math.max.apply(Math, ints), Math.min.apply(Math, ints)];
		if (ints[0] % ints[1] === 0) {
			finished = true;
		} else {
			ints[0] = ints[0] - ints[1];
		}
	}
	return ints[1];
}

exports.gcf = gcf;
exports.factor = factor;
