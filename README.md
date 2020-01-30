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

### DictWrapper(values, name)

An base class for generation an object contains a dictionary.

**@Params:**

| param  | type                    | description        |
|--------|-------------------------|--------------------|
| values | string | array | object | sequence of values |
| name   | string                  | sequence of values |


**@Methods:**

<details>
  <summary><b>.initSequence(values)</b></summary>

Initializes with a sequence of equally-likely values.

**@Params:**

| param  | type  | description        |
|--------|-------|--------------------|
| values | array | sequence of values |


</details>

<details>
  <summary><b>.initMapping(values)</b></summary>

Initializes with a map from value to probability.

**@Params:**

| param  | type | description                   |
|--------|------|-------------------------------|
| values | map  | map from value to probability |


</details>

<details>
  <summary><b>.initPmf(values)</b></summary>

Initializes with a Pmf.

**@Params:**

| param  | type | description |
|--------|------|-------------|
| values | pmf  | Pmf object  |


</details>

<details>
  <summary><b>.initFailure(values)</b></summary>

Throw an error.

</details>

<details>
  <summary><b>.values()</b></summary>

Gets an unsorted sequence of values.

Note: One source of confusion is that the keys of this

dictionary are the values of the Hist/Pmf, and the

values of the dictionary are frequencies/probabilities.

</details>

<details>
  <summary><b>.items()</b></summary>

Gets an unsorted sequence of (value, freq/prob) pairs.

</details>

<details>
  <summary><b>.set(value, prob)</b></summary>

Sets the freq/prob associated with the value x.

**@Params:**

| param | type   | description               |
|-------|--------|---------------------------|
| value | any    | number value or case name |
| prob  | number | number freq or prob       |


</details>

<details>
  <summary><b>.incr(x, term = 1)</b></summary>

Increments the freq/prob associated with the value x.

**@Params:**

| param | type   | description               |
|-------|--------|---------------------------|
| x     | any    | number value or case name |
| term  | number | how much to increment by  |


</details>

<details>
  <summary><b>.mult(x, factor = 1)</b></summary>

Scales the freq/prob associated with the value x.

**@Params:**

| param  | type   | description               |
|--------|--------|---------------------------|
| x      | any    | number value or case name |
| factor | number | how much to multiply by   |


</details>

<details>
  <summary><b>.remove(value)</b></summary>

Removes a value.

Throws an exception if the value is not there.

**@Params:**

| param | type | description     |
|-------|------|-----------------|
| value | any  | value to remove |


</details>

<details>
  <summary><b>.total()</b></summary>

Returns the total of the frequencies/probabilities in the map.

</details>

<details>
  <summary><b>.maxLike()</b></summary>

Returns the largest frequency/probability in the map.

</details>

<details>
  <summary><b>.copy(name)</b></summary>

Returns a copy.

Make a shallow copy of d. If you want a deep copy of d,

use one method to deep clone the whole object.

**@Params:**

| param | type   | description                  |
|-------|--------|------------------------------|
| name  | string | string name for the new Hist |


**@Returns:** new object

</details>

<details>
  <summary><b>.scale(factor)</b></summary>

Multiplies the values by a factor.

**@Params:**

| param  | type   | description         |
|--------|--------|---------------------|
| factor | number | what to multiply by |


**@Returns:** new object

</details>

<details>
  <summary><b>.log(m)</b></summary>

Log transforms the probabilities.

Removes values with probability 0.

Normalizes so that the largest logprob is 0.

**@Params:**

| param | type   | description                                    |
|-------|--------|------------------------------------------------|
| m     | number | how much to shift the ps before exponentiating |


</details>

<details>
  <summary><b>.exp(m)</b></summary>

Exponentiates the probabilities.

If m is un-exist, normalizes so that the largest prob is 1.

**@Params:**

| param | type   | description                                    |
|-------|--------|------------------------------------------------|
| m     | number | how much to shift the ps before exponentiating |


</details>

<details>
  <summary><b>.getDict()</b></summary>

Gets the dictionary.

</details>

<details>
  <summary><b>.setDict(d)</b></summary>

Sets the dictionary.

**@Params:**

| param | type         | description |
|-------|--------------|-------------|
| d     | map | object |             |


</details>

<details>
  <summary><b>.render()</b></summary>

Generates a sequence of points suitable for plotting.

**@Returns:** array of [sorted value sequence, freq/prob sequence]

</details>

<details>
  <summary><b>.print()</b></summary>

Prints the values and freqs/probs in ascending order.

**@Params:**

| param  | type | description |
|--------|------|-------------|
| indent |      |             |


</details>

### Pmf(values, name)

Represents a probability mass function.

Values can be any hashable type; probabilities are floating-point.

Pmfs are not necessarily normalized.

**@Params:**

| param  | type                    | description        |
|--------|-------------------------|--------------------|
| values | string | array | object | sequence of values |
| name   | string                  | sequence of values |


**@Methods:**

**Important:** This class inherits from **DictWrapper**, so you can use all methods of the parent class.

<details>
  <summary><b>.prob(x, probDefault = 0)</b></summary>

Gets the probability associated with the value x.

**@Params:**

| param       | type   | description                             |
|-------------|--------|-----------------------------------------|
| x           | any    | number value                            |
| probDefault | number | value to return if the key is not there |


**@Returns:** probability

</details>

<details>
  <summary><b>.probs(xs)</b></summary>

Gets probabilities for a sequence of values.

**@Params:**

| param | type  | description          |
|-------|-------|----------------------|
| xs    | array | a sequence of values |


**@Returns:** array of probabilities

</details>

<details>
  <summary><b>.makeCdf(name)</b></summary>

Makes a cdf.

**@Params:**

| param | type   | description          |
|-------|--------|----------------------|
| name  | string | the name for new cdf |


**@Returns:** one new cdf

</details>

<details>
  <summary><b>.probGreater(x)</b></summary>

Calculate the probability while the value is greater than x.

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| x     | number |             |


**@Returns:** probability

</details>

<details>
  <summary><b>.probLess(x)</b></summary>

Calculate the probability while the value is less than x.

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| x     | number |             |


**@Returns:** probability

</details>

<details>
  <summary><b>.normalize(fraction = 1.0)</b></summary>

Normalizes this PMF so the sum of all probs is fraction.

**@Params:**

| param    | type   | description                                  |
|----------|--------|----------------------------------------------|
| fraction | number | what the total should be after normalization |


**@Returns:** the total probability before normalizing

</details>

<details>
  <summary><b>.random()</b></summary>

Chooses a random element from this PMF.

**@Returns:** float value from the pmf

</details>

<details>
  <summary><b>.mean()</b></summary>

Computes the mean of a PMF.

**@Returns:** float mean

</details>

<details>
  <summary><b>.var(miu)</b></summary>

Computes the variance of a PMF.

**@Params:**

| param | type   | description                                                                    |
|-------|--------|--------------------------------------------------------------------------------|
| miu   | number | the point around which the variance is computed; if omitted, computes the mean |


**@Returns:** float variance

</details>

<details>
  <summary><b>.maximumLikelihood()</b></summary>

Returns the value with the highest probability.

**@Returns:** float probability

</details>

<details>
  <summary><b>.credibleInterval(percentage = 90)</b></summary>

Computes the central credible interval.

If percentage=90, computes the 90% CI.

**@Params:**

| param      | type   | description             |
|------------|--------|-------------------------|
| percentage | number | float between 0 and 100 |


**@Returns:** sequence of two floats, low and high

</details>

<details>
  <summary><b>.add(other)</b></summary>

Computes the Pmf of the sum of values drawn from self and other.

**@Params:**

| param | type         | description             |
|-------|--------------|-------------------------|
| other | number | pmf | another pmf or a number |


**@Returns:** new pmf

</details>

<details>
  <summary><b>.addPmf(other)</b></summary>

Computes the Pmf of the sum of values drawn from self and other.

**@Params:**

| param | type | description |
|-------|------|-------------|
| other | pmf  | another pmf |


**@Returns:** new pmf

</details>

<details>
  <summary><b>.addConstant(other)</b></summary>

Computes the Pmf of the sum a constant and  values from self.

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| other | number | a number    |


**@Returns:** new pmf

</details>

<details>
  <summary><b>.sub(other)</b></summary>

Computes the Pmf of the diff of values drawn from self and other.

**@Params:**

| param | type | description |
|-------|------|-------------|
| other | pmf  | another pmf |


**@Returns:** new pmf

</details>

<details>
  <summary><b>.max(k)</b></summary>

Computes the CDF of the maximum of k selections from this dist.

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| k     | number | int         |


**@Returns:** new cdf

</details>

### Cdf(xs, ps, name)

Represents a cumulative distribution function.

**@Params:**

| param | type   | description                  |
|-------|--------|------------------------------|
| xs    | array  | sequence of values           |
| ps    | array  | sequence of probabilities    |
| name  | string | string used as a graph label |


**@Methods:**

**Important:** This class inherits from **DictWrapper**, so you can use all methods of the parent class.

<details>
  <summary><b>.copy(name)</b></summary>

Represents a cumulative distribution function.

**@Params:**

| param | type   | description                 |
|-------|--------|-----------------------------|
| name  | string | string name for the new cdf |


**@Returns:** new cdf

</details>

<details>
  <summary><b>.makePmf(name)</b></summary>

Makes a Pmf.

**@Params:**

| param | type   | description                 |
|-------|--------|-----------------------------|
| name  | string | string name for the new pmf |


**@Returns:** new pmf

</details>

<details>
  <summary><b>.values()</b></summary>

Returns a sorted list of values.

**@Returns:** array of values

</details>

<details>
  <summary><b>.items()</b></summary>

Returns a sorted sequence of [value, probability] pairs.

**@Returns:** array of [value, probability] pairs

</details>

<details>
  <summary><b>.append(x, p)</b></summary>

Add an (x, p) pair to the end of this CDF.

Note: this us normally used to build a CDF from scratch, not

to modify existing CDFs.  It is up to the caller to make sure

that the result is a legal CDF.

**@Params:**

| param | type   | description               |
|-------|--------|---------------------------|
| x     | any    | number value or case name |
| p     | number | number freq or prob       |


</details>

<details>
  <summary><b>.shift(term)</b></summary>

Adds a term to the xs.

**@Params:**

| param | type   | description     |
|-------|--------|-----------------|
| term  | number | how much to add |


**@Returns:** another cdf

</details>

<details>
  <summary><b>.scale(factor)</b></summary>

Multiplies the xs by a factor.

**@Params:**

| param  | type | description         |
|--------|------|---------------------|
| factor |      | what to multiply by |


**@Returns:** another cdf

</details>

<details>
  <summary><b>.prob(x)</b></summary>

Returns CDF(x), the probability that corresponds to value x.

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| x     | number | number      |


**@Returns:** float probability

</details>

<details>
  <summary><b>.value(p)</b></summary>

Returns InverseCDF(p), the value that corresponds to probability p.

**@Params:**

| param | type   | description                |
|-------|--------|----------------------------|
| p     | number | number in the range [0, 1] |


**@Returns:** number value

</details>

<details>
  <summary><b>.percentile(p)</b></summary>

Returns the value that corresponds to percentile p.

**@Params:**

| param | type   | description                  |
|-------|--------|------------------------------|
| p     | number | number in the range [0, 100] |


**@Returns:** number value

</details>

<details>
  <summary><b>.random()</b></summary>

Chooses a random value from this distribution.

**@Returns:** number value

</details>

<details>
  <summary><b>.sample(n)</b></summary>

Generates a random sample from this distribution.

**@Params:**

| param | type   | description              |
|-------|--------|--------------------------|
| n     | number | int length of the sample |


**@Returns:** array of random values

</details>

<details>
  <summary><b>.mean()</b></summary>

Computes the mean of a CDF.

**@Returns:** float mean

</details>

<details>
  <summary><b>.credibleInterval(percentage = 90)</b></summary>

Computes the central credible interval.

If percentage=90, computes the 90% CI.

**@Params:**

| param      | type   | description             |
|------------|--------|-------------------------|
| percentage | number | float between 0 and 100 |


**@Returns:** sequence of two floats, low and high

</details>

<details>
  <summary><b>.render()</b></summary>

Generates a sequence of points suitable for plotting.

An empirical CDF is a step function; linear interpolation can be misleading.

**@Returns:** array of points

</details>

<details>
  <summary><b>.max(k)</b></summary>

Computes the CDF of the maximum of k selections from this dist.

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| k     | number | int         |


**@Returns:** new Cdf

</details>

### Pdf()

Represents a probability density function (PDF).

**@Methods:**

<details>
  <summary><b>.density(x)</b></summary>

Evaluates this pdf at x.

This method needs implement by children class, if not there is an <code>UnimplementedMethodException</code> would be throw when the method is called

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| x     | number | number      |


**@Returns:** float probability density

</details>

<details>
  <summary><b>.makePmf(xs, name)</b></summary>

Makes a discrete version of this pdf, evaluated at xs.

**@Params:**

| param | type                    | description                       |
|-------|-------------------------|-----------------------------------|
| xs    | string | array | object | equally-spaced sequence of values |


**@Returns:** new pmf

</details>

### Suite(values, name)

Represents a suite of hypotheses and their probabilities.

**@Params:**

| param  | type                    | description        |
|--------|-------------------------|--------------------|
| values | string | array | object | sequence of values |
| name   | string                  | sequence of values |


**@Methods:**

**Important:** This class inherits from **Pmf**, so you can use all methods of the parent class.

<details>
  <summary><b>.update(data)</b></summary>

Updates each hypothesis based on the data.

**@Params:**

| param | type | description                    |
|-------|------|--------------------------------|
| data  | any  | any representation of the data |


**@Returns:** the normalizing constant

</details>

<details>
  <summary><b>.logUpdate(data)</b></summary>

Updates a suite of hypotheses based on new data.

Modifies the suite directly; if you want to keep the original, make a copy.

Note: unlike Update, LogUpdate does not normalize.

**@Params:**

| param | type | description                |
|-------|------|----------------------------|
| any   | any  | representation of the data |


</details>

<details>
  <summary><b>.updateSet(dataset)</b></summary>

Updates each hypothesis based on the dataset.

This is more efficient than calling Update repeatedly because

it waits until the end to Normalize.

Modifies the suite directly; if you want to keep the original, make a copy.

**@Params:**

| param   | type        | description        |
|---------|-------------|--------------------|
| dataset | array | set | a sequence of data |


**@Returns:** the normalizing constant

</details>

<details>
  <summary><b>.logUpdateSet(dataset)</b></summary>

Updates each hypothesis based on the dataset.

Modifies the suite directly; if you want to keep the original, make a copy.

**@Params:**

| param   | type        | description        |
|---------|-------------|--------------------|
| dataset | array | set | a sequence of data |


</details>

<details>
  <summary><b>.likelihood(data, hypo)</b></summary>

Computes the likelihood of the data under the hypothesis.

This method needs implement by children class

if not there is an <code>UnimplementedMethodException</code> would be throw

**@Params:**

| param | type | description                           |
|-------|------|---------------------------------------|
| data  | any  | some representation of the data       |
| hypo  | any  | some representation of the hypothesis |


**@Returns:** likelihood

</details>

<details>
  <summary><b>.logLikelihood(data, hypo)</b></summary>

Computes the log likelihood of the data under the hypothesis.

This method needs implement by children class

if not there is an <code>UnimplementedMethodException</code> would be throw

**@Params:**

| param | type | description                           |
|-------|------|---------------------------------------|
| data  | any  | some representation of the data       |
| hypo  | any  | some representation of the hypothesis |


**@Returns:** likelihood

</details>

<details>
  <summary><b>.makeOdds()</b></summary>

Transforms from probabilities to odds.

Values with prob=0 are removed.

</details>

<details>
  <summary><b>.makeProbs()</b></summary>

Transforms from odds to probabilities.

</details>

### Hist(values, name)

Represents a histogram, which is a map from values to frequencies.

Values can be any hashable type; frequencies are integer counters.

**@Params:**

| param  | type                    | description        |
|--------|-------------------------|--------------------|
| values | string | array | object | sequence of values |
| name   | string                  | sequence of values |


**@Methods:**

**Important:** This class inherits from **DictWrapper**, so you can use all methods of the parent class.

<details>
  <summary><b>.freq(x)</b></summary>

Gets the frequency associated with the value x.

**@Params:**

| param | type | description  |
|-------|------|--------------|
| x     | any  | number value |


**@Returns:** int frequency

</details>

<details>
  <summary><b>.freqs(xs)</b></summary>

Gets frequencies for a sequence of values.

</details>

<details>
  <summary><b>.isSubset(other)</b></summary>

Checks whether the values in this histogram are a subset of

the values in the given histogram.

</details>

<details>
  <summary><b>.subtract(other)</b></summary>

Subtracts the values in the given histogram from this histogram.

</details>

### Interpolater(xs, ys)

Represents a mapping between sorted sequences; performs linear interp.

**@Params:**

| param | type  | description |
|-------|-------|-------------|
| xs    | array | sorted list |
| ys    | array | sorted list |


**@Methods:**

<details>
  <summary><b>.lookup(x)</b></summary>

Looks up x and returns the corresponding value of y.

</details>

<details>
  <summary><b>.reverse(x)</b></summary>

Looks up y and returns the corresponding value of x.

</details>

### Joint(values, name)

Represents a joint distribution.

The values are sequences (usually tuples)

**@Params:**

| param  | type                    | description        |
|--------|-------------------------|--------------------|
| values | string | array | object | sequence of values |
| name   | string                  | sequence of values |


**@Methods:**

**Important:** This class inherits from **Pmf**, so you can use all methods of the parent class.

<details>
  <summary><b>.marginal(i, name)</b></summary>

Gets the marginal distribution of the indicated variable.

**@Params:**

| param | type   | description                   |
|-------|--------|-------------------------------|
| i     | number | index of the variable we want |


**@Returns:** Pmf

</details>

<details>
  <summary><b>.conditional(i, j, val, name)</b></summary>

Gets the conditional distribution of the indicated variable.

Distribution of vs[i], conditioned on vs[j] = val.

**@Params:**

| param | type   | description                            |
|-------|--------|----------------------------------------|
| i     | number | index of the variable we want          |
| j     | number | which variable is conditioned on       |
| val   |        | the value the jth variable has to have |


**@Returns:** Pmf

</details>

<details>
  <summary><b>.maxLikeInterval(percentage = 90)</b></summary>

Returns the maximum-likelihood credible interval.

If percentage=90, computes a 90% CI containing the values

with the highest likelihoods.

**@Params:**

| param      | type   | description             |
|------------|--------|-------------------------|
| percentage | number | float between 0 and 100 |


**@Returns:** list of values from the suite

</details>

### GaussianPdf()

Represents the PDF of a Gaussian distribution.

**@Methods:**

**Important:** This class inherits from **Pdf**, so you can use all methods of the parent class.

<details>
  <summary><b>.constructor(mu, sigma)</b></summary>

Constructs a Gaussian Pdf with given mu and sigma.

**@Params:**

| param | type   | description        |
|-------|--------|--------------------|
| mu    | number | mean               |
| sigma | number | standard deviation |


</details>

<details>
  <summary><b>.density(x)</b></summary>

Evaluates this Pdf at x.

**@Returns:** float probability density

</details>

### GaussianKde()

TODO: implemente this class.

### EstimatedPdf(sample)

Represents a PDF estimated by KDE.

Estimates the density function based on a sample.

**@Params:**

| param  | type  | description      |
|--------|-------|------------------|
| sample | array | sequence of data |


**@Methods:**

**Important:** This class inherits from **Pdf**, so you can use all methods of the parent class.

<details>
  <summary><b>.density(x)</b></summary>

Evaluates this Pdf at x.

**@Returns:** float probability density

</details>



## Utility Functions

This library provides some **Utility Functions** following for calculations related to probability and statistics.

These functions can be imported by the same way following:

```js
import { odds, probability, percentile } from 'think-bayes/helpers';
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



## Q&A

### How to reduce the precision loss caused by the calculation of float point number in javascript?

This library use **[decimal.js](http://mikemcl.github.io/decimal.js/)** to handle the problem what calculation of float point number, in the same way, you can use it in this library:

```js
import { Decimal } from 'think-bayes';

Decimal.add(0.1, 0.2).toNumber() === 0.3; // true
```
