# think-bayes

An algorithm framework of probability and statistics for **ES6+** and **CommonJS** environment.

In progress...

> 用于 **ES6+** 和 **CommonJS** 环境的概率统计算法框架（未完成，努力 coding 中...）

## Features

This library provides the following **classes** for calculations related to probability and statistics

> 本算法库提供以下 **类** 用于概率统计相关的计算

### Pmf

Represents a probability mass function.

> 概率质量函数

### Cdf

Represents a cumulative distribution function.

> 累积分布函数

### Pdf

Represents a probability density function (PDF).

> 概率密度函数

### Suite

Represents a suite of hypotheses and their probabilities.

> 一组（互斥、完备的）假设及其概率

### Hist

Represents a histogram, which is a map from values to frequencies.

> 直方图，即一组值与其频率的映射

### Interpolater

Represents a mapping between sorted sequences which performs linear interp.

> （两个）有序分布间的映射，用于线性插值

### Joint

Represents a joint distribution.

> 联合分布

### GaussianPdf

Represents the PDF of a Gaussian distribution.

> 高斯分布的 概率密度函数（PDF）

### GaussianKde (unimplemented)

Represents Gaussian kernel density estimates.

> 高斯核密度估计（待实现）

### EstimatedPdf

Represents a PDF estimated by KDE.

> 由 内核密度估计（KDE）估算 概率密度函数（PDF）

