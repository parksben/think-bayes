# DictWrapper(values, name)

An base class for generation an object contains a dictionary.

**@Params:**

| param  | type                    | description        |
|--------|-------------------------|--------------------|
| values | string | array | object | sequence of values |
| name   | string                  | sequence of values |


**@Methods:**

## .initSequence(values)

Initializes with a sequence of equally-likely values.

**@Params:**

| param  | type  | description        |
|--------|-------|--------------------|
| values | array | sequence of values |


## .initMapping(values)

Initializes with a map from value to probability.

**@Params:**

| param  | type | description                   |
|--------|------|-------------------------------|
| values | map  | map from value to probability |


## .initPmf(values)

Initializes with a Pmf.

**@Params:**

| param  | type | description |
|--------|------|-------------|
| values | pmf  | Pmf object  |


## .initFailure(values)

Throw an error.

## .values()

Gets an unsorted sequence of values.

Note: One source of confusion is that the keys of this

dictionary are the values of the Hist/Pmf, and the

values of the dictionary are frequencies/probabilities.

## .items()

Gets an unsorted sequence of (value, freq/prob) pairs.

## .set(value, prob)

Sets the freq/prob associated with the value x.

**@Params:**

| param | type   | description               |
|-------|--------|---------------------------|
| value | any    | number value or case name |
| prob  | number | number freq or prob       |


## .incr(x, term = 1)

Increments the freq/prob associated with the value x.

**@Params:**

| param | type   | description               |
|-------|--------|---------------------------|
| x     | any    | number value or case name |
| term  | number | how much to increment by  |


## .mult(x, factor = 1)

Scales the freq/prob associated with the value x.

**@Params:**

| param  | type   | description               |
|--------|--------|---------------------------|
| x      | any    | number value or case name |
| factor | number | how much to multiply by   |


## .remove(value)

Removes a value.

Throws an exception if the value is not there.

**@Params:**

| param | type | description     |
|-------|------|-----------------|
| value | any  | value to remove |


## .total()

Returns the total of the frequencies/probabilities in the map.

## .maxLike()

Returns the largest frequency/probability in the map.

## .copy(name)

Returns a copy.

Make a shallow copy of d. If you want a deep copy of d,

use one method to deep clone the whole object.

**@Params:**

| param | type   | description                  |
|-------|--------|------------------------------|
| name  | string | string name for the new Hist |


**@Returns:** new object

## .scale(factor)

Multiplies the values by a factor.

**@Params:**

| param  | type   | description         |
|--------|--------|---------------------|
| factor | number | what to multiply by |


**@Returns:** new object

## .log(m)

Log transforms the probabilities.

Removes values with probability 0.

Normalizes so that the largest logprob is 0.

**@Params:**

| param | type   | description                                    |
|-------|--------|------------------------------------------------|
| m     | number | how much to shift the ps before exponentiating |


## .exp(m)

Exponentiates the probabilities.

If m is un-exist, normalizes so that the largest prob is 1.

**@Params:**

| param | type   | description                                    |
|-------|--------|------------------------------------------------|
| m     | number | how much to shift the ps before exponentiating |


## .getDict()

Gets the dictionary.

## .setDict(d)

Sets the dictionary.

**@Params:**

| param | type         | description |
|-------|--------------|-------------|
| d     | map | object |             |


## .render()

Generates a sequence of points suitable for plotting.

**@Returns:** array of [sorted value sequence, freq/prob sequence]

## .print()

Prints the values and freqs/probs in ascending order.

**@Params:**

| param  | type | description |
|--------|------|-------------|
| indent |      |             |


