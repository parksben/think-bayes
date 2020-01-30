# Pmf(values, name)

Represents a probability mass function.

Values can be any hashable type; probabilities are floating-point.

Pmfs are not necessarily normalized.

**@Params:**

| param  | type                    | description        |
|--------|-------------------------|--------------------|
| values | string | array | object | sequence of values |
| name   | string                  | sequence of values |


**@Methods:**

**Important:** This class inherits from [**DictWrapper**](../DictWrapper), so you can use all methods of the parent class.

## .prob(x, probDefault = 0)

Gets the probability associated with the value x.

**@Params:**

| param       | type   | description                             |
|-------------|--------|-----------------------------------------|
| x           | any    | number value                            |
| probDefault | number | value to return if the key is not there |


**@Returns:** probability

## .probs(xs)

Gets probabilities for a sequence of values.

**@Params:**

| param | type  | description          |
|-------|-------|----------------------|
| xs    | array | a sequence of values |


**@Returns:** array of probabilities

## .makeCdf(name)

Makes a cdf.

**@Params:**

| param | type   | description          |
|-------|--------|----------------------|
| name  | string | the name for new cdf |


**@Returns:** one new cdf

## .probGreater(x)

Calculate the probability while the value is greater than x.

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| x     | number |             |


**@Returns:** probability

## .probLess(x)

Calculate the probability while the value is less than x.

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| x     | number |             |


**@Returns:** probability

## .normalize(fraction = 1.0)

Normalizes this PMF so the sum of all probs is fraction.

**@Params:**

| param    | type   | description                                  |
|----------|--------|----------------------------------------------|
| fraction | number | what the total should be after normalization |


**@Returns:** the total probability before normalizing

## .random()

Chooses a random element from this PMF.

**@Returns:** float value from the pmf

## .mean()

Computes the mean of a PMF.

**@Returns:** float mean

## .var(miu)

Computes the variance of a PMF.

**@Params:**

| param | type   | description                                                                    |
|-------|--------|--------------------------------------------------------------------------------|
| miu   | number | the point around which the variance is computed; if omitted, computes the mean |


**@Returns:** float variance

## .maximumLikelihood()

Returns the value with the highest probability.

**@Returns:** float probability

## .credibleInterval(percentage = 90)

Computes the central credible interval.

If percentage=90, computes the 90% CI.

**@Params:**

| param      | type   | description             |
|------------|--------|-------------------------|
| percentage | number | float between 0 and 100 |


**@Returns:** sequence of two floats, low and high

## .add(other)

Computes the Pmf of the sum of values drawn from self and other.

**@Params:**

| param | type         | description             |
|-------|--------------|-------------------------|
| other | number | pmf | another pmf or a number |


**@Returns:** new pmf

## .addPmf(other)

Computes the Pmf of the sum of values drawn from self and other.

**@Params:**

| param | type | description |
|-------|------|-------------|
| other | pmf  | another pmf |


**@Returns:** new pmf

## .addConstant(other)

Computes the Pmf of the sum a constant and  values from self.

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| other | number | a number    |


**@Returns:** new pmf

## .sub(other)

Computes the Pmf of the diff of values drawn from self and other.

**@Params:**

| param | type | description |
|-------|------|-------------|
| other | pmf  | another pmf |


**@Returns:** new pmf

## .max(k)

Computes the CDF of the maximum of k selections from this dist.

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| k     | number | int         |


**@Returns:** new cdf

