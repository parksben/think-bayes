import math from '../math';

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
