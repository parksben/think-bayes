# GaussianPdf()

Represents the PDF of a Gaussian distribution.

**@Methods:**

**Important:** This class inherits from [**Pdf**](../Pdf), so you can use all methods of the parent class.

## .constructor(mu, sigma)

Constructs a Gaussian Pdf with given mu and sigma.

**@Params:**

| param | type   | description        |
|-------|--------|--------------------|
| mu    | number | mean               |
| sigma | number | standard deviation |


## .density(x)

Evaluates this Pdf at x.

**@Returns:** float probability density

