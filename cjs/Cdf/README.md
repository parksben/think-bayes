# Cdf(xs, ps, name)

Represents a cumulative distribution function.

**@Params:**

| param | type   | description                  |
|-------|--------|------------------------------|
| xs    | array  | sequence of values           |
| ps    | array  | sequence of probabilities    |
| name  | string | string used as a graph label |


**@Methods:**

**Important:** This class inherits from [**DictWrapper**](../DictWrapper), so you can use all methods of the parent class.

## .copy(name)

Represents a cumulative distribution function.

**@Params:**

| param | type   | description                 |
|-------|--------|-----------------------------|
| name  | string | string name for the new cdf |


**@Returns:** new cdf

## .makePmf(name)

Makes a Pmf.

**@Params:**

| param | type   | description                 |
|-------|--------|-----------------------------|
| name  | string | string name for the new pmf |


**@Returns:** new pmf

## .values()

Returns a sorted list of values.

**@Returns:** array of values

## .items()

Returns a sorted sequence of [value, probability] pairs.

**@Returns:** array of [value, probability] pairs

## .append(x, p)

Add an (x, p) pair to the end of this CDF.

Note: this us normally used to build a CDF from scratch, not

to modify existing CDFs.  It is up to the caller to make sure

that the result is a legal CDF.

**@Params:**

| param | type   | description               |
|-------|--------|---------------------------|
| x     | any    | number value or case name |
| p     | number | number freq or prob       |


## .shift(term)

Adds a term to the xs.

**@Params:**

| param | type   | description     |
|-------|--------|-----------------|
| term  | number | how much to add |


**@Returns:** another cdf

## .scale(factor)

Multiplies the xs by a factor.

**@Params:**

| param  | type | description         |
|--------|------|---------------------|
| factor |      | what to multiply by |


**@Returns:** another cdf

## .prob(x)

Returns CDF(x), the probability that corresponds to value x.

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| x     | number | number      |


**@Returns:** float probability

## .value(p)

Returns InverseCDF(p), the value that corresponds to probability p.

**@Params:**

| param | type   | description                |
|-------|--------|----------------------------|
| p     | number | number in the range [0, 1] |


**@Returns:** number value

## .percentile(p)

Returns the value that corresponds to percentile p.

**@Params:**

| param | type   | description                  |
|-------|--------|------------------------------|
| p     | number | number in the range [0, 100] |


**@Returns:** number value

## .random()

Chooses a random value from this distribution.

**@Returns:** number value

## .sample(n)

Generates a random sample from this distribution.

**@Params:**

| param | type   | description              |
|-------|--------|--------------------------|
| n     | number | int length of the sample |


**@Returns:** array of random values

## .mean()

Computes the mean of a CDF.

**@Returns:** float mean

## .credibleInterval(percentage = 90)

Computes the central credible interval.

If percentage=90, computes the 90% CI.

**@Params:**

| param      | type   | description             |
|------------|--------|-------------------------|
| percentage | number | float between 0 and 100 |


**@Returns:** sequence of two floats, low and high

## .render()

Generates a sequence of points suitable for plotting.

An empirical CDF is a step function; linear interpolation can be misleading.

**@Returns:** array of points

## .max(k)

Computes the CDF of the maximum of k selections from this dist.

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| k     | number | int         |


**@Returns:** new Cdf

