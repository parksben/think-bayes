# Suite(values, name)

Represents a suite of hypotheses and their probabilities.

**@Params:**

| param  | type                    | description        |
|--------|-------------------------|--------------------|
| values | string | array | object | sequence of values |
| name   | string                  | sequence of values |


**@Methods:**

**Important:** This class inherits from [**Pmf**](../Pmf), so you can use all methods of the parent class.

## .update(data)

Updates each hypothesis based on the data.

**@Params:**

| param | type | description                    |
|-------|------|--------------------------------|
| data  | any  | any representation of the data |


**@Returns:** the normalizing constant

## .logUpdate(data)

Updates a suite of hypotheses based on new data.

Modifies the suite directly; if you want to keep the original, make a copy.

Note: unlike Update, LogUpdate does not normalize.

**@Params:**

| param | type | description                |
|-------|------|----------------------------|
| any   | any  | representation of the data |


## .updateSet(dataset)

Updates each hypothesis based on the dataset.

This is more efficient than calling Update repeatedly because

it waits until the end to Normalize.

Modifies the suite directly; if you want to keep the original, make a copy.

**@Params:**

| param   | type        | description        |
|---------|-------------|--------------------|
| dataset | array | set | a sequence of data |


**@Returns:** the normalizing constant

## .logUpdateSet(dataset)

Updates each hypothesis based on the dataset.

Modifies the suite directly; if you want to keep the original, make a copy.

**@Params:**

| param   | type        | description        |
|---------|-------------|--------------------|
| dataset | array | set | a sequence of data |


## .likelihood(data, hypo)

Computes the likelihood of the data under the hypothesis.

This method needs implement by children class

if not there is an <code>UnimplementedMethodException</code> would be throw

**@Params:**

| param | type | description                           |
|-------|------|---------------------------------------|
| data  | any  | some representation of the data       |
| hypo  | any  | some representation of the hypothesis |


**@Returns:** likelihood

## .logLikelihood(data, hypo)

Computes the log likelihood of the data under the hypothesis.

This method needs implement by children class

if not there is an <code>UnimplementedMethodException</code> would be throw

**@Params:**

| param | type | description                           |
|-------|------|---------------------------------------|
| data  | any  | some representation of the data       |
| hypo  | any  | some representation of the hypothesis |


**@Returns:** likelihood

## .makeOdds()

Transforms from probabilities to odds.

Values with prob=0 are removed.

## .makeProbs()

Transforms from odds to probabilities.

