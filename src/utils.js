function addNumbers(a, b) {
  return a + b;
}

function subtractNumbers(a, b) {
  return a - b;
}

function multiplyNumbers(a, b) {
  return a * b;
}

function divideNumbers(a, b) {
  return a / b;
}

function isValidNumber(value) {
  return !isNaN(value) && isFinite(value);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    addNumbers,
    subtractNumbers,
    multiplyNumbers,
    divideNumbers,
    isValidNumber
  };
}