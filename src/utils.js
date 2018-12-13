import math from './math';

// ErrorType: ValueError
export class ValueError extends Error {}

/**
 * ErrorType: UnimplementedMethodException
 * Exception if someone calls a method that should be overridden.
 */
export class UnimplementedMethodException extends Error {}

// Create a new object by shallow copying another.
export const shallowClone = source => {
  if (!source || typeof source !== 'object')
    throw new ValueError('Invalid arguments value or type.');

  const targetObj = source.constructor === Array ? [] : {};
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      targetObj[key] = source[key];
    }
  }
  return targetObj;
};

// Detect if current environment is node.js
export const isNode = new Function(
  `try {
    return this === global;
  } catch (e) {
    return false;
  }`
);

// logging utils
export const logging = (lib => {
  const tool = shallowClone(lib);
  return Object.defineProperties(tool, {
    // print method likes `print` in python
    print: {
      value: tool.log,
      writable: false,
      configurable: false,
    },
    // warning method for different environment (node.js & browsers)
    warning: {
      value: text =>
        isNode() ? process.emitWarning(text) : tool.warn(`warning: ${text}`),
      writable: false,
      configurable: false,
    },
  });
})(console);

// Create an instance of ValueError due to invalid arguments.
export const newArgsError = desc =>
  new ValueError(`Invalid arguments value or type. ${desc || ''}`);

/**
 * Computes odds for a given probability.
 * Example: p=0.75 means 75 for and 25 against, or 3:1 odds in favor.
 * Note: when p=1, the formula for odds divides by zero, which is
 * normally undefined.  But I think it is reasonable to define Odds(1)
 * to be infinity, so that's what this function does.
 * @param {number} p float 0~1
 * @returns float odds
 */
export const odds = p => {
  if (!p || p < 0 || p > 1)
    throw newArgsError(
      'Value of the probability must be a number greater than 0 and less than 1.'
    );
  return p === 1 ? Infinity : math.div(p, math.sub(1, p));
};

/**
 * Computes the probability corresponding to given odds.
 * Example: o=2 means 2:1 odds in favor, or 2/3 probability
 * @param {number} o float odds, strictly positive
 * @returns float probability
 */
export const probability = o => {
  if (!o || o < 0)
    throw newArgsError('Value of the odds must be a positive number.');
  return math.div(o, math.add(o, 1));
};

/**
 * Computes the probability corresponding to given odds.
 * Example: yes=2, no=1 means 2:1 odds in favor, or 2/3 probability.
 * @param {number} yes int or float odds in favor
 * @param {number} no int or float odds in favor
 */
export const probability2 = (yes, no) => {
  if (!yes || yes < 0 || !no || no < 0)
    throw newArgsError('Value of the odds must be a positive number.');
  return math.div(yes, math.add(yes, no));
};

/**
 * Calculate the position where a new element should be
 * inserted in an ordered sequence by using the bisection method.
 * @param {array} xs Given ordered sequence
 * @param {number} x Number to be inserted
 */
export const bisect = (xs, x, s, e) => {
  if (!xs || !Array.isArray(xs))
    throw newArgsError(
      'Value of the first argument must be a sorted array of numbers.'
    );
  if (!x) throw newArgsError('Value of the second argument must be a number.');

  const start = s || 0;
  const end = e || math.sub(xs.length, 1);

  // (-Infinity, start] or [end, Infinity)
  if (x < xs[start]) return start;
  if (x === xs[start]) return math.add(start, 1);
  if (x >= xs[end]) return math.add(end, 1);

  // (start, end)
  // mid = parseInt(start + (end - start) / 2, 10)
  const mid = parseInt(math.add(start, math.div(math.sub(end, start), 2)), 10);
  if (x === xs[mid]) return math.add(mid, 1);
  return x > xs[mid]
    ? bisect(xs, x, math.add(mid, 1), end)
    : bisect(xs, x, start, math.sub(mid, 1));
};

// Print data set as a table
export const printTable = ({
  rows = [['-', '-']],
  header = ['Value', 'Prob'],
  minColWidth = 5,
  frameH = '-',
  frameV = '|',
}) => {
  const colWidth = {};
  const calColumnWidth = cn => {
    if (!colWidth[cn]) {
      colWidth[cn] = Math.max(
        ...[header, ...rows].map(row => String(row[cn]).length + 2),
        minColWidth
      );
    }
    return colWidth[cn];
  };

  const borderRow = new Array(header.length).fill('borderX');
  const data = frameH ? [header, borderRow, ...rows] : [header, ...rows];

  const lines = data.map(r => {
    const line = r
      .map((c, n) => {
        const td =
          c === 'borderX'
            ? `${frameV}${new Array(calColumnWidth(n)).fill(frameH).join('')}`
            : `${frameV} ${c}${new Array(
                calColumnWidth(n) - String(c).length - 1
              )
                .fill(' ')
                .join('')}`;
        return td;
      })
      .join('');
    return `${line}${frameV}\n`;
  });

  const printStr = `\n${lines.join('')}\n`;
  logging.print(printStr);
};

/**
 * Return evenly spaced numbers over a specified interval.
 * Returns num evenly spaced samples, calculated over the interval [start, stop].
 * The endpoint of the interval can optionally be excluded.
 * @param {number} start The starting value of the sequence.
 * @param {number} stop The end value of the sequence.
 * @param {number} num Number of samples to generate.
 * @param {boolean} endPoint If true, stop is the last sample. Otherwise, it is not included.
 * @param {boolean} retStep If true, return [samples, step], where step is the spacing between samples.
 */
export const linspace = (
  start,
  stop,
  num = 50,
  endPoint = true,
  retStep = false
) => {
  // step = (stop - start) / (endPoint ? num - 1 : num)
  const step = math.div(
    math.sub(stop, start),
    endPoint ? math.sub(num, 1) : num
  );
  const arr = [];
  for (let i = start; i <= stop && arr.length < num; i = math.add(i, step)) {
    arr.push(i);
  }
  return retStep ? [arr, step] : arr;
};
