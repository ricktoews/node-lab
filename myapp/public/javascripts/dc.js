/*
  dc.js
  One job: handle the Calculate button from the Decimal Calculator.
*/
var Route = {
  dc: '/math/dc/'
};


// this is what's actually supposed to happen when you click the Calculate button.
var calc = (e) => {
  let btn = e.currentTarget
  // this assumes the input field is the previous sibling of the calculate button.
  let fld = btn.previousSibling;
  let denom = fld.value;
  // this assumes the denom value is an integer.
  window.location = Route.dc + denom;
}

// adds click handler to specified element.
export default function (selector) {
  try {
    var calcButton = document.querySelector(selector);
    calcButton.addEventListener('click', calc);
  } catch (e) {
    console.log(`Coudn't attach click event to the specified element: ${selector}`);
    console.log(e);
  }
}

