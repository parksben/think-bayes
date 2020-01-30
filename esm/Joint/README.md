# Joint(values, name)

Represents a joint distribution.

The values are sequences (usually tuples)

**@Params:**

| param  | type                    | description        |
|--------|-------------------------|--------------------|
| values | string | array | object | sequence of values |
| name   | string                  | sequence of values |


**@Methods:**

**Important:** This class inherits from [**Pmf**](../Pmf), so you can use all methods of the parent class.

## .marginal(i, name)

Gets the marginal distribution of the indicated variable.

**@Params:**

| param | type   | description                   |
|-------|--------|-------------------------------|
| i     | number | index of the variable we want |


**@Returns:** Pmf

## .conditional(i, j, val, name)

Gets the conditional distribution of the indicated variable.

Distribution of vs[i], conditioned on vs[j] = val.

**@Params:**

| param | type   | description                            |
|-------|--------|----------------------------------------|
| i     | number | index of the variable we want          |
| j     | number | which variable is conditioned on       |
| val   |        | the value the jth variable has to have |


**@Returns:** Pmf

## .maxLikeInterval(percentage = 90)

Returns the maximum-likelihood credible interval.

If percentage=90, computes a 90% CI containing the values

with the highest likelihoods.

**@Params:**

| param      | type   | description             |
|------------|--------|-------------------------|
| percentage | number | float between 0 and 100 |


**@Returns:** list of values from the suite

