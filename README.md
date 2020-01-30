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

#### .prob(x, probDefault = 0)

Gets the probability associated with the value x.

**@Params:**

| param       | type   | description                             |
|-------------|--------|-----------------------------------------|
| x           | any    | number value                            |
| probDefault | number | value to return if the key is not there |


**@Returns:** probability

#### .probs(xs)

Gets probabilities for a sequence of values.

**@Params:**

| param | type  | description          |
|-------|-------|----------------------|
| xs    | array | a sequence of values |


**@Returns:** array of probabilities

#### .makeCdf(name)

Makes a cdf.

**@Params:**

| param | type   | description          |
|-------|--------|----------------------|
| name  | string | the name for new cdf |


**@Returns:** one new cdf

#### .probGreater(x)

Calculate the probability while the value is greater than x.

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| x     | number |             |


**@Returns:** probability

#### .probLess(x)

Calculate the probability while the value is less than x.

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| x     | number |             |


**@Returns:** probability

#### .normalize(fraction = 1.0)

Normalizes this PMF so the sum of all probs is fraction.

**@Params:**

| param    | type   | description                                  |
|----------|--------|----------------------------------------------|
| fraction | number | what the total should be after normalization |


**@Returns:** the total probability before normalizing

#### .random()

Chooses a random element from this PMF.

**@Returns:** float value from the pmf

#### .mean()

Computes the mean of a PMF.

**@Returns:** float mean

#### .var(miu)

Computes the variance of a PMF.

**@Params:**

| param | type   | description                                                                    |
|-------|--------|--------------------------------------------------------------------------------|
| mu    | number | the point around which the variance is computed; if omitted, computes the mean |


**@Returns:** float variance

#### .maximumLikelihood()

Returns the value with the highest probability.

**@Returns:** float probability

#### .credibleInterval(percentage = 90)

Computes the central credible interval.

If percentage=90, computes the 90% CI.

**@Params:**

| param      | type   | description             |
|------------|--------|-------------------------|
| percentage | number | float between 0 and 100 |


**@Returns:** sequence of two floats, low and high

#### .add(other)

Computes the Pmf of the sum of values drawn from self and other.

**@Params:**

| param | type         | description             |
|-------|--------------|-------------------------|
| other | number | pmf | another pmf or a number |


**@Returns:** new pmf

#### .addPmf(other)

Computes the Pmf of the sum of values drawn from self and other.

**@Params:**

| param | type | description |
|-------|------|-------------|
| other | pmf  | another pmf |


**@Returns:** new pmf

#### .addConstant(other)

Computes the Pmf of the sum a constant and  values from self.

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| other | number | a number    |


**@Returns:** new pmf

#### .sub(other)

Computes the Pmf of the diff of values drawn from self and other.

**@Params:**

| param | type | description |
|-------|------|-------------|
| other | pmf  | another pmf |


**@Returns:** new pmf

#### .max(k)

Computes the CDF of the maximum of k selections from this dist.

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| k     | number | int         |


**@Returns:** new cdf

### Cdf

Represents a cumulative distribution function.

#### .copy(name)

Represents a cumulative distribution function.

**@Params:**

| param | type   | description                 |
|-------|--------|-----------------------------|
| name  | string | string name for the new cdf |


**@Returns:** new cdf

#### .makePmf(name)

Makes a Pmf.

**@Params:**

| param | type   | description                 |
|-------|--------|-----------------------------|
| name  | string | string name for the new pmf |


**@Returns:** new pmf

#### .values()

Returns a sorted list of values.

**@Returns:** array of values

#### .items()

Returns a sorted sequence of [value, probability] pairs.

**@Returns:** array of [value, probability] pairs

#### .append(x, p)

Add an (x, p) pair to the end of this CDF.

Note: this us normally used to build a CDF from scratch, not

to modify existing CDFs.  It is up to the caller to make sure

that the result is a legal CDF.

**@Params:**

| param | type   | description               |
|-------|--------|---------------------------|
| x     | any    | number value or case name |
| p     | number | number freq or prob       |


#### .shift(term)

Adds a term to the xs.

**@Params:**

| param | type   | description     |
|-------|--------|-----------------|
| term  | number | how much to add |


**@Returns:** another cdf

#### .scale(factor)

Multiplies the xs by a factor.

**@Params:**

| param  | type | description         |
|--------|------|---------------------|
| factor |      | what to multiply by |


**@Returns:** another cdf

#### .prob(x)

Returns CDF(x), the probability that corresponds to value x.

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| x     | number | number      |


**@Returns:** float probability

#### .value(p)

Returns InverseCDF(p), the value that corresponds to probability p.

**@Params:**

| param | type   | description                |
|-------|--------|----------------------------|
| p     | number | number in the range [0, 1] |


**@Returns:** number value

#### .percentile(p)

Returns the value that corresponds to percentile p.

**@Params:**

| param | type   | description                  |
|-------|--------|------------------------------|
| p     | number | number in the range [0, 100] |


**@Returns:** number value

#### .random()

Chooses a random value from this distribution.

**@Returns:** number value

#### .sample(n)

Generates a random sample from this distribution.

**@Params:**

| param | type   | description              |
|-------|--------|--------------------------|
| n     | number | int length of the sample |


**@Returns:** array of random values

#### .mean()

Computes the mean of a CDF.

**@Returns:** float mean

#### .credibleInterval(percentage = 90)

Computes the central credible interval.

If percentage=90, computes the 90% CI.

**@Params:**

| param      | type   | description             |
|------------|--------|-------------------------|
| percentage | number | float between 0 and 100 |


**@Returns:** sequence of two floats, low and high

#### .render()

Generates a sequence of points suitable for plotting.

An empirical CDF is a step function; linear interpolation can be misleading.

**@Returns:** array of points

#### .max(k)

Computes the CDF of the maximum of k selections from this dist.

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| k     | number | int         |


**@Returns:** new Cdf

### Pdf

Represents a probability density function (PDF).

#### .density(x)

Evaluates this pdf at x.

This method needs implement by children class

if not there is an <code>UnimplementedMethodException</code> would be throw

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| x     | number | number      |


**@Returns:** float probability density

#### .makePmf(xs, name)

Makes a discrete version of this pdf, evaluated at xs.

**@Params:**

| param | type                    | description                       |
|-------|-------------------------|-----------------------------------|
| xs    | string | array | object | equally-spaced sequence of values |


**@Returns:** new pmf

### Suite

Represents a suite of hypotheses and their probabilities.

#### .update(data)

Updates each hypothesis based on the data.

**@Params:**

| param | type | description                    |
|-------|------|--------------------------------|
| data  | any  | any representation of the data |


**@Returns:** the normalizing constant

#### .logUpdate(data)

Updates a suite of hypotheses based on new data.

Modifies the suite directly; if you want to keep the original, make a copy.

Note: unlike Update, LogUpdate does not normalize.

**@Params:**

| param | type | description                |
|-------|------|----------------------------|
| any   | any  | representation of the data |


#### .updateSet(dataset)

Updates each hypothesis based on the dataset.

This is more efficient than calling Update repeatedly because

it waits until the end to Normalize.

Modifies the suite directly; if you want to keep the original, make a copy.

**@Params:**

| param   | type        | description        |
|---------|-------------|--------------------|
| dataset | array | set | a sequence of data |


**@Returns:** the normalizing constant

#### .logUpdateSet(dataset)

Updates each hypothesis based on the dataset.

Modifies the suite directly; if you want to keep the original, make a copy.

**@Params:**

| param   | type        | description        |
|---------|-------------|--------------------|
| dataset | array | set | a sequence of data |


#### .likelihood(data, hypo)

Computes the likelihood of the data under the hypothesis.

This method needs implement by children class

if not there is an <code>UnimplementedMethodException</code> would be throw

**@Params:**

| param | type | description                           |
|-------|------|---------------------------------------|
| data  | any  | some representation of the data       |
| hypo  | any  | some representation of the hypothesis |


**@Returns:** likelihood

#### .logLikelihood(data, hypo)

Computes the log likelihood of the data under the hypothesis.

This method needs implement by children class

if not there is an <code>UnimplementedMethodException</code> would be throw

**@Params:**

| param | type | description                           |
|-------|------|---------------------------------------|
| data  | any  | some representation of the data       |
| hypo  | any  | some representation of the hypothesis |


**@Returns:** likelihood

#### .makeOdds()

Transforms from probabilities to odds.

Values with prob=0 are removed.

#### .makeProbs()

Transforms from odds to probabilities.

### Hist

Represents a histogram, which is a map from values to frequencies.

Values can be any hashable type; frequencies are integer counters.

#### .freq(x)

Gets the frequency associated with the value x.

**@Params:**

| param | type | description  |
|-------|------|--------------|
| x     | any  | number value |


**@Returns:** int frequency

#### .freqs(xs)

Gets frequencies for a sequence of values.

#### .isSubset(other)

Checks whether the values in this histogram are a subset of

the values in the given histogram.

#### .subtract(other)

Subtracts the values in the given histogram from this histogram.

### Interpolater

Represents a mapping between sorted sequences; performs linear interp.

#### .lookup(x)

Looks up x and returns the corresponding value of y.

#### .reverse(x)

Looks up y and returns the corresponding value of x.

### Joint

Represents a joint distribution.

The values are sequences (usually tuples)

#### .marginal(i, name)

Gets the marginal distribution of the indicated variable.

**@Params:**

| param | type   | description                   |
|-------|--------|-------------------------------|
| i     | number | index of the variable we want |


**@Returns:** Pmf

#### .conditional(i, j, val, name)

Gets the conditional distribution of the indicated variable.

Distribution of vs[i], conditioned on vs[j] = val.

**@Params:**

| param | type   | description                            |
|-------|--------|----------------------------------------|
| i     | number | index of the variable we want          |
| j     | number | which variable is conditioned on       |
| val   |        | the value the jth variable has to have |


**@Returns:** Pmf

#### .maxLikeInterval(percentage = 90)

Returns the maximum-likelihood credible interval.

If percentage=90, computes a 90% CI containing the values

with the highest likelihoods.

**@Params:**

| param      | type   | description             |
|------------|--------|-------------------------|
| percentage | number | float between 0 and 100 |


**@Returns:** list of values from the suite

### GaussianPdf

Represents the PDF of a Gaussian distribution.

#### .constructor(mu, sigma)

Constructs a Gaussian Pdf with given mu and sigma.

**@Params:**

| param | type   | description        |
|-------|--------|--------------------|
| mu    | number | mean               |
| sigma | number | standard deviation |


#### .density(x)

Evaluates this Pdf at x.

**@Returns:** float probability density

### GaussianKde

TODO: implemente this class.

### EstimatedPdf

Represents a PDF estimated by KDE.

#### .constructor(sample)

Estimates the density function based on a sample.

**@Params:**

| param  | type  | description      |
|--------|-------|------------------|
| sample | array | sequence of data |


#### .density(x)

Evaluates this Pdf at x.

**@Returns:** float probability density



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


