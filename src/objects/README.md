## Object Functions

这类函数针对`对象`执行。

### keys

- 实现思路：这个函数获取的键名有两个条件：

1. 对象自己的，不能是原型链上继承来的

2. 可枚举的

计划使用`for in`以及`hasOwnProperty`来实现这个函数功能。

`for in`会循环遍历对象上说有可枚举，非`symbol`，对象自身的或从原型链上继承来的属性（原生属性除外，因为不可枚举？感觉是）。

`hasOwnProperty`会判断这个属性是否是对象自有的。

- 和源码的区别

1. 源码先判断是否存在`Object.keys()`函数，如果存在则直接调用这个函数。复习一下， **`Object.keys()`函数返回的是对象自己的可枚举的属性**。

2. 开头判断如果传入的参数不是对象，则返回一个空数组。

3. 增加了对ie9以下的bug兼容


### allKeys

- 实现思路

使用`for in`就可以办到，ojbk！

### values

- 实现思路

打算使用`for of`，不过这个语法循环的是 **循环对象** 定义的允许循环的东西，详见[这里](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of#Difference_between_for...of_and_for...in)。感觉直接使用这个会有问题。

果然源码也没有使用`for of`。

### mapObject && pairs && invert

很好实现

### create

和源码的设计基本一样。

### functions

源码处理的函数属性还包括原型链上的函数。

### findKey

很好实现。

### extend && extendOwn

很好实现。

### pick && omit

实现思路：

先把`arguments`的第一个元素剥离出来，作为对象，然后判断剥离后的`arguments`的`length`值，如果`length === 1`，则说明此刻`arguments[0]`是一个函数或是一个数组或者是一个字符串，函数走函数的代码，数组走数组的代码， 字符串直接获取对应的属性返回。如果`length > 1`，说明是多个字符串，转成数组形式，走数组的代码。

omit和pick是反向选取。

### defaults

很好实现。

### clone

很好实现。源码还考虑了数组的情况。

### tap

这个函数暂且搁置，待实现完chain函数再来实现这个。

### has