# think-bayes

An algorithm framework of probability and statistics for **browser** and **Node.js** environment.

In progress...

> 适用于 **浏览器** 和 **Node.js** 环境的概率统计算法框架（未完成，努力 coding 中...）

## Algorithm Classes

This library provides some **ES Classes** following for calculations related to probability and statistics.

These classes can be imported by the same way following:

```js
import { Pmf, Cdf, Pdf, Suite } from 'think-bayes';
```

### Pmf

Represents a probability mass function.

Values can be any hashable type; probabilities are floating-point.

Pmfs are not necessarily normalized.

#### <details>
  <summary>.prob(x, probDefault = 0)</summary>

Gets the probability associated with the value x.

**@Params:**

| param       | type   | description                             |
|-------------|--------|-----------------------------------------|
| x           | any    | number value                            |
| probDefault | number | value to return if the key is not there |


**@Returns:** probability

</details>

#### <details>
  <summary>.probs(xs)</summary>

Gets probabilities for a sequence of values.

**@Params:**

| param | type  | description          |
|-------|-------|----------------------|
| xs    | array | a sequence of values |


**@Returns:** array of probabilities

</details>

#### <details>
  <summary>.makeCdf(name)</summary>

Makes a cdf.

**@Params:**

| param | type   | description          |
|-------|--------|----------------------|
| name  | string | the name for new cdf |


**@Returns:** one new cdf

</details>

#### <details>
  <summary>.probGreater(x)</summary>

Calculate the probability while the value is greater than x.

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| x     | number |             |


**@Returns:** probability

</details>

#### <details>
  <summary>.probLess(x)</summary>

Calculate the probability while the value is less than x.

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| x     | number |             |


**@Returns:** probability

</details>

#### <details>
  <summary>.normalize(fraction = 1.0)</summary>

Normalizes this PMF so the sum of all probs is fraction.

**@Params:**

| param    | type   | description                                  |
|----------|--------|----------------------------------------------|
| fraction | number | what the total should be after normalization |


**@Returns:** the total probability before normalizing

</details>

#### <details>
  <summary>.random()</summary>

Chooses a random element from this PMF.

**@Returns:** float value from the pmf

</details>

#### <details>
  <summary>.mean()</summary>

Computes the mean of a PMF.

**@Returns:** float mean

</details>

#### <details>
  <summary>.var(miu)</summary>

Computes the variance of a PMF.

**@Params:**

| param | type   | description                                                                    |
|-------|--------|--------------------------------------------------------------------------------|
| mu    | number | the point around which the variance is computed; if omitted, computes the mean |


**@Returns:** float variance

</details>

#### <details>
  <summary>.maximumLikelihood()</summary>

Returns the value with the highest probability.

**@Returns:** float probability

</details>

#### <details>
  <summary>.credibleInterval(percentage = 90)</summary>

Computes the central credible interval.

If percentage=90, computes the 90% CI.

**@Params:**

| param      | type   | description             |
|------------|--------|-------------------------|
| percentage | number | float between 0 and 100 |


**@Returns:** sequence of two floats, low and high

</details>

#### <details>
  <summary>.add(other)</summary>

Computes the Pmf of the sum of values drawn from self and other.

**@Params:**

| param | type         | description             |
|-------|--------------|-------------------------|
| other | number | pmf | another pmf or a number |


**@Returns:** new pmf

</details>

#### <details>
  <summary>.addPmf(other)</summary>

Computes the Pmf of the sum of values drawn from self and other.

**@Params:**

| param | type | description |
|-------|------|-------------|
| other | pmf  | another pmf |


**@Returns:** new pmf

</details>

#### <details>
  <summary>.addConstant(other)</summary>

Computes the Pmf of the sum a constant and  values from self.

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| other | number | a number    |


**@Returns:** new pmf

</details>

#### <details>
  <summary>.sub(other)</summary>

Computes the Pmf of the diff of values drawn from self and other.

**@Params:**

| param | type | description |
|-------|------|-------------|
| other | pmf  | another pmf |


**@Returns:** new pmf

</details>

#### <details>
  <summary>.max(k)</summary>

Computes the CDF of the maximum of k selections from this dist.

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| k     | number | int         |


**@Returns:** new cdf

</details>

### Cdf

Represents a cumulative distribution function.

#### <details>
  <summary>.copy(name)</summary>

Represents a cumulative distribution function.

**@Params:**

| param | type   | description                 |
|-------|--------|-----------------------------|
| name  | string | string name for the new cdf |


**@Returns:** new cdf

</details>

#### <details>
  <summary>.makePmf(name)</summary>

Makes a Pmf.

**@Params:**

| param | type   | description                 |
|-------|--------|-----------------------------|
| name  | string | string name for the new pmf |


**@Returns:** new pmf

</details>

#### <details>
  <summary>.values()</summary>

Returns a sorted list of values.

**@Returns:** array of values

</details>

#### <details>
  <summary>.items()</summary>

Returns a sorted sequence of [value, probability] pairs.

**@Returns:** array of [value, probability] pairs

</details>

#### <details>
  <summary>.append(x, p)</summary>

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

#### <details>
  <summary>.shift(term)</summary>

Adds a term to the xs.

**@Params:**

| param | type   | description     |
|-------|--------|-----------------|
| term  | number | how much to add |


**@Returns:** another cdf

</details>

#### <details>
  <summary>.scale(factor)</summary>

Multiplies the xs by a factor.

**@Params:**

| param  | type | description         |
|--------|------|---------------------|
| factor |      | what to multiply by |


**@Returns:** another cdf

</details>

#### <details>
  <summary>.prob(x)</summary>

Returns CDF(x), the probability that corresponds to value x.

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| x     | number | number      |


**@Returns:** float probability

</details>

#### <details>
  <summary>.value(p)</summary>

Returns InverseCDF(p), the value that corresponds to probability p.

**@Params:**

| param | type   | description                |
|-------|--------|----------------------------|
| p     | number | number in the range [0, 1] |


**@Returns:** number value

</details>

#### <details>
  <summary>.percentile(p)</summary>

Returns the value that corresponds to percentile p.

**@Params:**

| param | type   | description                  |
|-------|--------|------------------------------|
| p     | number | number in the range [0, 100] |


**@Returns:** number value

</details>

#### <details>
  <summary>.random()</summary>

Chooses a random value from this distribution.

**@Returns:** number value

</details>

#### <details>
  <summary>.sample(n)</summary>

Generates a random sample from this distribution.

**@Params:**

| param | type   | description              |
|-------|--------|--------------------------|
| n     | number | int length of the sample |


**@Returns:** array of random values

</details>

#### <details>
  <summary>.mean()</summary>

Computes the mean of a CDF.

**@Returns:** float mean

</details>

#### <details>
  <summary>.credibleInterval(percentage = 90)</summary>

Computes the central credible interval.

If percentage=90, computes the 90% CI.

**@Params:**

| param      | type   | description             |
|------------|--------|-------------------------|
| percentage | number | float between 0 and 100 |


**@Returns:** sequence of two floats, low and high

</details>

#### <details>
  <summary>.render()</summary>

Generates a sequence of points suitable for plotting.

An empirical CDF is a step function; linear interpolation can be misleading.

**@Returns:** array of points

</details>

#### <details>
  <summary>.max(k)</summary>

Computes the CDF of the maximum of k selections from this dist.

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| k     | number | int         |


**@Returns:** new Cdf

</details>

### Pdf

Represents a probability density function (PDF).

#### <details>
  <summary>.density(x)</summary>

Evaluates this pdf at x.

This method needs implement by children class

if not there is an <code>UnimplementedMethodException</code> would be throw

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| x     | number | number      |


**@Returns:** float probability density

</details>

#### <details>
  <summary>.makePmf(xs, name)</summary>

Makes a discrete version of this pdf, evaluated at xs.

**@Params:**

| param | type                    | description                       |
|-------|-------------------------|-----------------------------------|
| xs    | string | array | object | equally-spaced sequence of values |


**@Returns:** new pmf

</details>

### Suite

Represents a suite of hypotheses and their probabilities.

#### <details>
  <summary>.update(data)</summary>

Updates each hypothesis based on the data.

**@Params:**

| param | type | description                    |
|-------|------|--------------------------------|
| data  | any  | any representation of the data |


**@Returns:** the normalizing constant

</details>

#### <details>
  <summary>.logUpdate(data)</summary>

Updates a suite of hypotheses based on new data.

Modifies the suite directly; if you want to keep the original, make a copy.

Note: unlike Update, LogUpdate does not normalize.

**@Params:**

| param | type | description                |
|-------|------|----------------------------|
| any   | any  | representation of the data |


</details>

#### <details>
  <summary>.updateSet(dataset)</summary>

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

#### <details>
  <summary>.logUpdateSet(dataset)</summary>

Updates each hypothesis based on the dataset.

Modifies the suite directly; if you want to keep the original, make a copy.

**@Params:**

| param   | type        | description        |
|---------|-------------|--------------------|
| dataset | array | set | a sequence of data |


</details>

#### <details>
  <summary>.likelihood(data, hypo)</summary>

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

#### <details>
  <summary>.logLikelihood(data, hypo)</summary>

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

#### <details>
  <summary>.makeOdds()</summary>

Transforms from probabilities to odds.

Values with prob=0 are removed.

</details>

#### <details>
  <summary>.makeProbs()</summary>

Transforms from odds to probabilities.

</details>

### Hist

Represents a histogram, which is a map from values to frequencies.

Values can be any hashable type; frequencies are integer counters.

#### <details>
  <summary>.freq(x)</summary>

Gets the frequency associated with the value x.

**@Params:**

| param | type | description  |
|-------|------|--------------|
| x     | any  | number value |


**@Returns:** int frequency

</details>

#### <details>
  <summary>.freqs(xs)</summary>

Gets frequencies for a sequence of values.

</details>

#### <details>
  <summary>.isSubset(other)</summary>

Checks whether the values in this histogram are a subset of

the values in the given histogram.

</details>

#### <details>
  <summary>.subtract(other)</summary>

Subtracts the values in the given histogram from this histogram.

</details>

### Interpolater

Represents a mapping between sorted sequences; performs linear interp.

#### <details>
  <summary>.lookup(x)</summary>

Looks up x and returns the corresponding value of y.

</details>

#### <details>
  <summary>.reverse(x)</summary>

Looks up y and returns the corresponding value of x.

</details>

### Joint

Represents a joint distribution.

The values are sequences (usually tuples)

#### <details>
  <summary>.marginal(i, name)</summary>

Gets the marginal distribution of the indicated variable.

**@Params:**

| param | type   | description                   |
|-------|--------|-------------------------------|
| i     | number | index of the variable we want |


**@Returns:** Pmf

</details>

#### <details>
  <summary>.conditional(i, j, val, name)</summary>

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

#### <details>
  <summary>.maxLikeInterval(percentage = 90)</summary>

Returns the maximum-likelihood credible interval.

If percentage=90, computes a 90% CI containing the values

with the highest likelihoods.

**@Params:**

| param      | type   | description             |
|------------|--------|-------------------------|
| percentage | number | float between 0 and 100 |


**@Returns:** list of values from the suite

</details>

### GaussianPdf

Represents the PDF of a Gaussian distribution.

#### <details>
  <summary>.constructor(mu, sigma)</summary>

Constructs a Gaussian Pdf with given mu and sigma.

**@Params:**

| param | type   | description        |
|-------|--------|--------------------|
| mu    | number | mean               |
| sigma | number | standard deviation |


</details>

#### <details>
  <summary>.density(x)</summary>

Evaluates this Pdf at x.

**@Returns:** float probability density

</details>

### GaussianKde

TODO: implemente this class.

### EstimatedPdf

Represents a PDF estimated by KDE.

#### <details>
  <summary>.constructor(sample)</summary>

Estimates the density function based on a sample.

**@Params:**

| param  | type  | description      |
|--------|-------|------------------|
| sample | array | sequence of data |


</details>

#### <details>
  <summary>.density(x)</summary>

Evaluates this Pdf at x.

**@Returns:** float probability density

</details>



## Utility Functions

This library provides some **Utility Functions** following for calculations related to probability and statistics.

These functions can be imported by the same way following:

```js
import { odds, probability, percentile } from 'think-bayes/helpers';
```

### odds(p)

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

### probability(o)

Computes the probability corresponding to given odds.

<strong>Example:</strong> o=2 means 2:1 odds in favor, or 2/3 probability

**@Params:**

| param | type   | description                   |
|-------|--------|-------------------------------|
| o     | number | float odds, strictly positive |


**@Returns:** float probability

### probability2(yes, no)

Computes the probability corresponding to given odds.

<strong>Example:</strong> yes=2, no=1 means 2:1 odds in favor, or 2/3 probability.

**@Params:**

| param | type   | description                |
|-------|--------|----------------------------|
| yes   | number | int or float odds in favor |
| no    | number | int or float odds in favor |


### percentile(pmf, percentage)

Computes a percentile of a given Pmf.

**@Params:**

| param      | type   | description |
|------------|--------|-------------|
| pmf        | pmf    |             |
| percentage | number | float 0-100 |


### credibleInterval(pmf, percentage = 90)

Computes a credible interval for a given distribution.

If percentage=90, computes the 90% CI.

**@Params:**

| param      | type   | description                                      |
|------------|--------|--------------------------------------------------|
| pmf        | pmf    | Pmf object representing a posterior distribution |
| percentage | number | float between 0 and 100                          |


**@Returns:** sequence of two floats, low and high

### pmfProbLess(pmf1, pmf2)

Probability that a value from pmf1 is less than a value from pmf2.

**@Params:**

| param | type | description |
|-------|------|-------------|
| pmf1  | pmf  | Pmf object  |
| pmf2  | pmf  | Pmf object  |


**@Returns:** float probability

### pmfProbGreater(pmf1, pmf2)

Probability that a value from pmf1 is greater than a value from pmf2.

**@Params:**

| param | type | description |
|-------|------|-------------|
| pmf1  | pmf  | Pmf object  |
| pmf2  | pmf  | Pmf object  |


**@Returns:** float probability

### pmfProbEqual(pmf1, pmf2)

Probability that a value from pmf1 equals a value from pmf2.

**@Params:**

| param | type | description |
|-------|------|-------------|
| pmf1  | pmf  | Pmf object  |
| pmf2  | pmf  | Pmf object  |


**@Returns:** float probability

### randomSum(dists)

Chooses a random value from each dist and returns the sum.

**@Params:**

| param | type  | description                    |
|-------|-------|--------------------------------|
| dists | array | sequence of Pmf or Cdf objects |


**@Returns:** numerical sum

### sampleSum(dists, n)

Draws a sample of sums from a list of distributions.

**@Params:**

| param | type   | description                    |
|-------|--------|--------------------------------|
| dists | array  | sequence of Pmf or Cdf objects |
| n     | number | sample size                    |


**@Returns:** new Pmf of sums

### evalGaussianPdf(x, mu, sigma)

Computes the unnormalized PDF of the normal distribution.

**@Params:**

| param | type   | description        |
|-------|--------|--------------------|
| x     | number | value              |
| mu    | number | mean               |
| sigma | number | standard deviation |


**@Returns:** float probability density

### makeGaussianPdf(mu, sigma, numSigmas, n = 201)

Makes a PMF discrete approx to a Gaussian distribution.

**@Params:**

| param     | type   | description                                 |
|-----------|--------|---------------------------------------------|
| mu        | number | float mean                                  |
| sigma     | number | float standard deviation                    |
| numSigmas | number | how many sigmas to extend in each direction |
| n         | number | number of values in the Pmf                 |


**@Returns:** normalized Pmf

### evalBinomialPmf(k, n, p)

Evaluates the binomial pmf.

**@Returns:** the probabily of k successes in n trials with probability p.

### evalPoissonPmf(k, lam)

Computes the Poisson PMF.

**@Params:**

| param | type   | description                              |
|-------|--------|------------------------------------------|
| k     | number | number of events                         |
| lam   | number | parameter lambda in events per unit time |


**@Returns:** float probability


