# Pdf()

Represents a probability density function (PDF).

**@Methods:**

## .density(x)

Evaluates this pdf at x.

This method needs implement by children class, if not there is an <code>UnimplementedMethodException</code> would be throw when the method is called

**@Params:**

| param | type   | description |
|-------|--------|-------------|
| x     | number | number      |


**@Returns:** float probability density

## .makePmf(xs, name)

Makes a discrete version of this pdf, evaluated at xs.

**@Params:**

| param | type                    | description                       |
|-------|-------------------------|-----------------------------------|
| xs    | string | array | object | equally-spaced sequence of values |


**@Returns:** new pmf

