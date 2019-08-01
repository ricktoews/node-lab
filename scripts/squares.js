const MAX_INT = 15;
const SQUARES = (function() {
  var max_sqrt = Math.floor(Math.sqrt(2 * MAX_INT - 1));
  var squares = [...Array(max_sqrt)].map((a, b) => b*b + 2*b + 1);
  return squares;
})();

var differences = {};
var series = [];

function get_sq_diffs(n) {
  var diffs = [];
  SQUARES.forEach(sq => { let d = sq - n; if (d > 0 && d <= MAX_INT && d !== n) { diffs.push(d); } });
  return diffs;
}


function create_differences(max_int) {
  differences = {};
  for (let i = 1; i <= max_int; i++) {
    differences[i] = get_sq_diffs(i);
  }
  return differences;
}


function find_start() {
  var start = [];
  var minlength = differences[1].length;
  for (let i = 2; i <= MAX_INT; i++) {
    let _min = Math.min(differences[i-1].length, differences[1].length);
	if (_min < minlength) minlength = _min;
  }
  for (let i = 1; i <= MAX_INT; i++) {
    if (differences[i].length === minlength) {
	  start.push({ n: i, differences: differences[i] });
	}
  }
  return start;
}


function trail_step(num) {
  var diffs = differences[num], step, found = -1, found_ndx;
  // We have the current number and the differences between it and a
  // square. Get the next available difference from that list. Store
  // the difference and its index in the list. If the list contains
  // no more valid numbers, leave found as -1.
  diffs.forEach((d, ndx) => {
    if (found === -1 && series.indexOf(d) === -1) {
      found = d;
      found_ndx = ndx;
    }
  });
  // If we found a valid number in the differences list, this step
  // was successful: we add the difference to the series and remember
  // the details for this step.
  if (found !== -1) {
    series.push(num);
    step = { 
      series: series.slice(0), 
      diffs: diffs.slice(0),
      found: found,
      found_ndx: found_ndx
    };
//	console.log('Trail_step:', step.series, step.diffs, step.found, step.found_ndx);
    stack.push(step);
  } else {
    // Else: the difference list contained no valid numbers to follow the
	// current one. That means the num parameter passed to this function
	// doesn't work at this point in the series, so we have to backtrack.
	// This is signaled by a falsey value for step.
//    console.log('trail_step -1; num, series, diffs', num, series, diffs);
  }
  return step;
}


function backtrack() {
  var lastStep = stack.pop();
  var lastSeries = series.pop();
  if (!lastStep) {
  	return -2;
  }
  lastStep.series.pop();
  var ndx = lastStep.found_ndx + 1;
  var num;
  while (ndx < lastStep.diffs.length) {
    if (series.indexOf(lastStep.diffs[ndx]) === -1) {
      num = lastStep.diffs[ndx];
	  trail_step(num);
//      console.log('backtrack, added new num to series', lastStep.series, series);
    }
    ndx++;
  }
  if (!num) {
    num = backtrack();
  }
  return num;
}

var stack = [];
function follow_trail(num) {
  var done = false;
  var safety = 0;
  while (safety < 20 && stack.length <= MAX_INT) {
    let step = trail_step(num);
    if (step) {
      console.log('follow_trail added to stack', step.series);
      num = step.found;
    } else {
	console.log('must backtrack');
      stack.forEach(s => {
	    console.log(s);
	  });
//      num = backtrack();
      safety = 20;
	}
	safety++;
  }
  if (stack.length === MAX_INT) {
  } else {
  }
}


create_differences(MAX_INT);
console.log(differences);
var start = find_start();
//console.log(start);
var seq = follow_trail(8);

