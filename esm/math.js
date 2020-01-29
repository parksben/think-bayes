import { Decimal } from 'decimal.js';

// Add: a + b
export const add = (a, b) => Decimal.add(a, b).toNumber();

// Subtract: a - b
export const sub = (a, b) => Decimal.sub(a, b).toNumber();

// Multiply: a * b
export const mult = (a, b) => Decimal.mul(a, b).toNumber();

// Divide: a / b
export const div = (a, b) => Decimal.div(a, b).toNumber();

// Compare function
export const compare = (a, b) => {
  if (typeof a === 'number' && typeof b === 'number') {
    return sub(a, b);
  }
  return a - b;
};

// Factorial: n!
export const factorial = n => {
  let res = 1;
  for (let i = 0; i < n; i++) {
    res *= i + 1;
  }
  return res;
};

export default {
  add,
  sub,
  mult,
  div,
  compare,
  factorial,
};
