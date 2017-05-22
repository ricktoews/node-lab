var MathUtils = require('../MathUtils');

describe('GCF', () => {
	it ('should calculate GCF of 34 and 51', () => {
		var gcf = MathUtils.gcf(34, 51);
		expect(gcf).toBe(17);
	});

	it ('should calculate GCF of 34 and 68', () => {
		var gcf = MathUtils.gcf(34, 68);
		expect(gcf).toBe(34);
	});

	it ('should calculate GCF of 13 and 40', () => {
		var gcf = MathUtils.gcf(13, 40);
		expect(gcf).toBe(1);
	});
});

describe('Factor', () => {
	it ('should factor 10', () => {
		var f = MathUtils.factor(10);
		expect(f).toEqual([2,5]);
	});

	it ('shoudl factor 20', () => {
		var f = MathUtils.factor(20);
		expect(f).toEqual([2,2,5]);
	});

	it ('shoudl factor 29', () => {
		var f = MathUtils.factor(29);
		expect(f).toEqual([]);
	});
});
