// Make a factor for float point numbers becoming to integer
const factor = (l, r) => {
  const tails = [l, r].map(x => (String(x).split('.')[1] || '').length);
  return 10 ** Math.max(...tails);
};

// Make items for calculate
const items = (a, b) => {
  const f = factor(a, b);
  const [l, r] = [a, b].map(x => parseInt(x * f));
  return { l, r, f };
};

// Add: a + b
export const add = (a, b) => {
  const { l, r, f } = items(a, b);
  return (l + r) / f;
};

// Subtract: a - b
export const sub = (a, b) => {
  const { l, r, f } = items(a, b);
  return (l - r) / f;
};

// Multiply: a * b
export const mult = (a, b) => {
  const { l, r, f } = items(a, b);
  return (l * r) / (f * f);
};

// Divide: a / b
export const div = (a, b) => {
  const { l, r } = items(a, b);
  return l / r;
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
  factorial,
};
