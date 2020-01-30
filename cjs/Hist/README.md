# Hist(values, name)

Represents a histogram, which is a map from values to frequencies.

Values can be any hashable type; frequencies are integer counters.

**@Params:**

| param  | type                    | description        |
|--------|-------------------------|--------------------|
| values | string | array | object | sequence of values |
| name   | string                  | sequence of values |


**@Methods:**

**Important:** This class inherits from [**DictWrapper**](../DictWrapper), so you can use all methods of the parent class.

## .freq(x)

Gets the frequency associated with the value x.

**@Params:**

| param | type | description  |
|-------|------|--------------|
| x     | any  | number value |


**@Returns:** int frequency

## .freqs(xs)

Gets frequencies for a sequence of values.

## .isSubset(other)

Checks whether the values in this histogram are a subset of

the values in the given histogram.

## .subtract(other)

Subtracts the values in the given histogram from this histogram.

