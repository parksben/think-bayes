# think-bayes

![npm](https://img.shields.io/npm/l/think-bayes.svg)
![npm](https://img.shields.io/npm/dt/think-bayes.svg)
![npm](https://img.shields.io/npm/v/think-bayes/latest.svg)

An algorithm collection of probability and statistics for **browser** and **Node.js** environment.

In progress...

> 适用于 **浏览器** 和 **Node.js** 环境的概率统计算法集（非正式版本，功能亟待完善，努力 coding 中...）

## Install

```bash
yarn add think-bayes # OR npm i --save think-bayes
```

## Quickstart

Let us resolve [the cookie problem](https://www.oreilly.com/library/view/think-bayes/13333JSONBOOK/a0000000336.html) by using the class `Suite`:

```js
import { Suite } from 'think-bayes';

class Cookie extends Suite {
  mixes = {
    Bowl1: {
      vanilla: 0.75,
      chocolate: 0.25,
    },
    Bowl2: {
      vanilla: 0.5,
      chocolate: 0.5,
    },
  };

  likelihood(data, hypo) {
    const mix = this.mixes[hypo];
    const like = mix[data];
    return like;
  }
}

const hypos = ['Bowl1', 'Bowl2'];
const pmf = new Cookie(hypos);
pmf.update('vanilla');

const result = pmf.render();
console.log(result); // [ [ 'Bowl1', 0.6 ], [ 'Bowl2', 0.4 ] ]

// You can also print the result as a table
pmf.print();
// | Value | Prob |
// |-------|------|
// | Bowl1 | 0.6  |
// | Bowl2 | 0.4  |
```

In addition, here are some simple [demos](./demo) you can refer directly to resolve some classic problems of probability and statistics.

## Algorithm Classes

This library provides some **ES Classes** following for calculations related to probability and statistics.

These classes can be imported by the same way following:

```js
import { Pmf, Cdf, Pdf, Suite } from 'think-bayes';
```

[**DictWrapper**](esm/DictWrapper) 

[**Pmf**](esm/Pmf) <code>inherits DictWrapper</code>

[**Cdf**](esm/Cdf) <code>inherits DictWrapper</code>

[**Pdf**](esm/Pdf) 

[**Suite**](esm/Suite) <code>inherits Pmf</code>

[**Hist**](esm/Hist) <code>inherits DictWrapper</code>

[**Interpolater**](esm/Interpolater) 

[**Joint**](esm/Joint) <code>inherits Pmf</code>

[**GaussianPdf**](esm/GaussianPdf) <code>inherits Pdf</code>

[**GaussianKde**](esm/GaussianKde) 

[**EstimatedPdf**](esm/EstimatedPdf) <code>inherits Pdf</code>



## Utility Functions

This library provides some **Utility Functions** following for calculations related to probability and statistics.

These functions can be imported by the same way following:

```js
import { Util } from 'think-bayes';
const { odds, probability, percentile } = Util;
```

<details>
  <summary><b>odds(p)</b></summary>

Computes odds for a given probability.

<strong>Example:</strong> p=0.75 means 75 for and 25 against, or 3:1 odds in favor.

<strong>Note:</strong> when p=1, the formula for odds divides by zero, which is

normally undefined.  But I think it is reasonable to define Odds(1)

to be infinity, so that's what this function does.

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| p     | number | float 0~1   |


**@Returns:** float odds

</details>

<details>
  <summary><b>probability(o)</b></summary>

Computes the probability corresponding to given odds.

<strong>Example:</strong> o=2 means 2:1 odds in favor, or 2/3 probability

**@Params:**

| param | type   | description                   |
|-------|--------|-------------------------------|
| o     | number | float odds, strictly positive |


**@Returns:** float probability

</details>

<details>
  <summary><b>probability2(yes, no)</b></summary>

Computes the probability corresponding to given odds.

<strong>Example:</strong> yes=2, no=1 means 2:1 odds in favor, or 2/3 probability.

**@Params:**

| param | type   | description                |
|-------|--------|----------------------------|
| yes   | number | int or float odds in favor |
| no    | number | int or float odds in favor |


</details>

<details>
  <summary><b>percentile(pmf, percentage)</b></summary>

Computes a percentile of a given Pmf.

**@Params:**

| param      | type   | description |
|------------|--------|-------------|
| pmf        | pmf    |             |
| percentage | number | float 0-100 |


</details>

<details>
  <summary><b>credibleInterval(pmf, percentage = 90)</b></summary>

Computes a credible interval for a given distribution.

If percentage=90, computes the 90% CI.

**@Params:**

| param      | type   | description                                      |
|------------|--------|--------------------------------------------------|
| pmf        | pmf    | Pmf object representing a posterior distribution |
| percentage | number | float between 0 and 100                          |


**@Returns:** sequence of two floats, low and high

</details>

<details>
  <summary><b>pmfProbLess(pmf1, pmf2)</b></summary>

Probability that a value from pmf1 is less than a value from pmf2.

**@Params:**

| param | type | description |
|-------|------|-------------|
| pmf1  | pmf  | Pmf object  |
| pmf2  | pmf  | Pmf object  |


**@Returns:** float probability

</details>

<details>
  <summary><b>pmfProbGreater(pmf1, pmf2)</b></summary>

Probability that a value from pmf1 is greater than a value from pmf2.

**@Params:**

| param | type | description |
|-------|------|-------------|
| pmf1  | pmf  | Pmf object  |
| pmf2  | pmf  | Pmf object  |


**@Returns:** float probability

</details>

<details>
  <summary><b>pmfProbEqual(pmf1, pmf2)</b></summary>

Probability that a value from pmf1 equals a value from pmf2.

**@Params:**

| param | type | description |
|-------|------|-------------|
| pmf1  | pmf  | Pmf object  |
| pmf2  | pmf  | Pmf object  |


**@Returns:** float probability

</details>

<details>
  <summary><b>randomSum(dists)</b></summary>

Chooses a random value from each dist and returns the sum.

**@Params:**

| param | type  | description                    |
|-------|-------|--------------------------------|
| dists | array | sequence of Pmf or Cdf objects |


**@Returns:** numerical sum

</details>

<details>
  <summary><b>sampleSum(dists, n)</b></summary>

Draws a sample of sums from a list of distributions.

**@Params:**

| param | type   | description                    |
|-------|--------|--------------------------------|
| dists | array  | sequence of Pmf or Cdf objects |
| n     | number | sample size                    |


**@Returns:** new Pmf of sums

</details>

<details>
  <summary><b>evalGaussianPdf(x, mu, sigma)</b></summary>

Computes the unnormalized PDF of the normal distribution.

**@Params:**

| param | type   | description        |
|-------|--------|--------------------|
| x     | number | value              |
| mu    | number | mean               |
| sigma | number | standard deviation |


**@Returns:** float probability density

</details>

<details>
  <summary><b>makeGaussianPdf(mu, sigma, numSigmas, n = 201)</b></summary>

Makes a PMF discrete approx to a Gaussian distribution.

**@Params:**

| param     | type   | description                                 |
|-----------|--------|---------------------------------------------|
| mu        | number | float mean                                  |
| sigma     | number | float standard deviation                    |
| numSigmas | number | how many sigmas to extend in each direction |
| n         | number | number of values in the Pmf                 |


**@Returns:** normalized Pmf

</details>

<details>
  <summary><b>evalBinomialPmf(k, n, p)</b></summary>

Evaluates the binomial pmf.

**@Returns:** the probabily of k successes in n trials with probability p.

</details>

<details>
  <summary><b>evalPoissonPmf(k, lam)</b></summary>

Computes the Poisson PMF.

**@Params:**

| param | type   | description                              |
|-------|--------|------------------------------------------|
| k     | number | number of events                         |
| lam   | number | parameter lambda in events per unit time |


**@Returns:** float probability

</details>

<details>
  <summary><b>makeJoint(pmf1, pmf2)</b></summary>

Joint distribution of values from pmf1 and pmf2.

**@Params:**

| param | type | description |
|-------|------|-------------|
| pmf1  | pmf  | Pmf object  |
| pmf2  | pmf  | Pmf object  |


**@Returns:** Joint pmf of value pairs

</details>

<details>
  <summary><b>makeHistFromList(t, name)</b></summary>

Makes a histogram from an unsorted sequence of values.

**@Params:**

| param | type   | description                    |
|-------|--------|--------------------------------|
| t     | array  | sequence of numbers            |
| name  | string | string name for this histogram |


**@Returns:** Hist object

</details>

<details>
  <summary><b>makeHistFromDict(d, name)</b></summary>

Makes a histogram from a map from values to frequencies.

**@Params:**

| param | type         | description                                |
|-------|--------------|--------------------------------------------|
| d     | object | map | dictionary that maps values to frequencies |
| name  | string       | string name for this histogram             |


**@Returns:** Hist object

</details>

<details>
  <summary><b>makePmfFromList(t, name)</b></summary>

Makes a PMF from an unsorted sequence of values.

**@Params:**

| param | type   | description              |
|-------|--------|--------------------------|
| t     | array  | sequence of numbers      |
| name  | string | string name for this PMF |


**@Returns:** Pmf object

</details>

<details>
  <summary><b>makePmfFromDict(d, name)</b></summary>

Makes a PMF from a map from values to probabilities.

**@Params:**

| param | type         | description                                    |
|-------|--------------|------------------------------------------------|
| d     | object | map | dictionary that maps values to probabilities   |
| name  | string       | string name for this PMF * @returns Pmf object |


</details>

<details>
  <summary><b>makePmfFromItems(t, name)</b></summary>

Makes a PMF from a sequence of value-probability pairs

**@Params:**

| param | type   | description                                    |
|-------|--------|------------------------------------------------|
| t     | array  | sequence of value-probability pairs            |
| name  | string | string name for this PMF * @returns Pmf object |


</details>

<details>
  <summary><b>makePmfFromHist(hist, name)</b></summary>

Makes a normalized PMF from a Hist object.

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| hist  | hist   | Hist object |
| name  | string | string name |


**@Returns:** Pmf object

</details>

<details>
  <summary><b>makePmfFromCdf(cdf, name)</b></summary>

Makes a normalized Pmf from a Cdf object.

**@Params:**

| param | type   | description                 |
|-------|--------|-----------------------------|
| cdf   | cdf    | Cdf object                  |
| name  | string | string name for the new Pmf |


**@Returns:** Pmf object

</details>

<details>
  <summary><b>makeMixture(metapmf, name = 'mix')</b></summary>

Make a mixture distribution.

**@Params:**

| param   | type   | description                       |
|---------|--------|-----------------------------------|
| metapmf | pmf    | Pmf that maps from Pmfs to probs. |
| name    | string | string name for the new Pmf       |


**@Returns:** Pmf object

</details>

<details>
  <summary><b>makeUniformPmf(low, high, n)</b></summary>

Make a uniform Pmf.

**@Params:**

| param | type   | description               |
|-------|--------|---------------------------|
| low   | number | lowest value (inclusive)  |
| high  | number | highest value (inclusize) |
| n     | number | number of values          |


</details>

<details>
  <summary><b>makeCdfFromItems(items, name = '')</b></summary>

Makes a cdf from an unsorted sequence of (value, frequency) pairs.

**@Params:**

| param | type   | description                                   |
|-------|--------|-----------------------------------------------|
| items | array  | unsorted sequence of (value, frequency) pairs |
| name  | string | string name for this CDF                      |


**@Returns:** cdf: list of (value, fraction) pairs

</details>

<details>
  <summary><b>makeCdfFromDict(d, name)</b></summary>

Makes a CDF from a dictionary that maps values to frequencies.

**@Params:**

| param | type         | description                                 |
|-------|--------------|---------------------------------------------|
| d     | object | map | dictionary that maps values to frequencies. |
| name  | string       | string name for the data.                   |


**@Returns:** Cdf object

</details>

<details>
  <summary><b>makeCdfFromHist(hist, name)</b></summary>

Makes a CDF from a Hist object.

**@Params:**

| param | type   | description               |
|-------|--------|---------------------------|
| hist  | hist   | Hist object               |
| name  | string | string name for the data. |


**@Returns:** Cdf object

</details>

<details>
  <summary><b>makeCdfFromList(seq, name)</b></summary>

Creates a CDF from an unsorted sequence.

**@Params:**

| param | type   | description                          |
|-------|--------|--------------------------------------|
| seq   | array  | unsorted sequence of sortable values |
| name  | string | string name for the cdf              |


**@Returns:** Cdf object

</details>

<details>
  <summary><b>makeCdfFromPmf(pmf, name)</b></summary>

Makes a CDF from a Pmf object.

**@Params:**

| param | type   | description               |
|-------|--------|---------------------------|
| pmf   | pmf    | Pmf object                |
| name  | string | string name for the data. |


**@Returns:** Cdf object

</details>

<details>
  <summary><b>makeSuiteFromDict(d, name)</b></summary>

Makes a suite from a map from values to probabilities.

**@Params:**

| param | type         | description                                  |
|-------|--------------|----------------------------------------------|
| d     | object | map | dictionary that maps values to probabilities |
| name  | string       | string name for this suite                   |


**@Returns:** Suite object

</details>

<details>
  <summary><b>makeSuiteFromList(t, name)</b></summary>

Makes a suite from an unsorted sequence of values.

**@Params:**

| param | type   | description                |
|-------|--------|----------------------------|
| t     | array  | sequence of numbers        |
| name  | string | string name for this suite |


</details>

<details>
  <summary><b>makeSuiteFromHist(hist, name)</b></summary>

Makes a normalized suite from a Hist object.

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| hist  | hist   | Hist object |
| name  | string | string name |


</details>

<details>
  <summary><b>makeSuiteFromCdf(cdf, name)</b></summary>

Makes a normalized Suite from a Cdf object.

**@Params:**

| param | type   | description                   |
|-------|--------|-------------------------------|
| cdf   | cdf    | Cdf object                    |
| name  | string | string name for the new Suite |


**@Returns:** Suite object

</details>



## Q&A

### How to reduce the precision loss caused by the calculation of float point number in javascript?

This library use **[decimal.js](http://mikemcl.github.io/decimal.js/)** to handle the problem what calculation of float point number, in the same way, you can use it in this library:

```js
import { Decimal } from 'think-bayes';

Decimal.add(0.1, 0.2).toNumber() === 0.3; // true
```
