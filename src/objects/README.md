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

文档中关于这个函数的说明有写道：

>这个函数用了 safe reference to the hasOwnProperty function

但是源码中仅仅是调用了`hasOwnProperty`这个函数，不知道所谓的`safe reference`体现在哪儿...桥豆麻袋！文档给了个[链接](https://www.pixelstech.net/article/1326986170-An-Object-is-not-a-Hash)，解释了`safe reference`，指的是使用`Object.prototype.hasOwnProperty.call(a, 'hasOwnProperty')`而不是直接在对象上调用`hasOwnProperty`，避免被重写。

### property

源码分成集合和单独字符串两种情况处理，自定义代码统一成数组集合来执行后续代码。

### propertyOf

反转`property`函数。

### matcher

和源码实现思路一样。

### isEqual

仅对对象和数组执行深度比较算法。

实现思路：

1. 首先判断传入的两个参数有一个参数为函数类型，则返回false
2. 判断两个参数的类型不一样，则返回false
3. 判断两个参数的类型是数字、字符串、布尔值、undefined，则返回两个参数的直接比较值
4. 如果一个参数等于null，则返回返回两个参数的直接比较值
5. 针对参数是对象或数组的情况统一处理
6. 如果两个参数的元素数量不一样，返回false
7. 进入迭代比较阶段
8. 如果参数1中的键名参数2中没有，返回false
9. 如果当前键值是基本类型，则直接比较，不一样则返回false
10. 如果不是基本类型进入递归比较， 如果递归比较返回false，则返回false
11. 迭代完毕，如果没有任意一处返回false，则返回true

和源码的区别：

1. 上面没有考虑是对象，但类型为`[object RegExp]`，`[object String]`，`[object Number]`，`[object Date]`，`[object Boolean]`，`[object Symbol]`的情况。

`[object Symbol]`类型用的`Symbol.prototype.valueOf.call()`判断的。

2. 源码考虑了正零，负零的问题
3. 源码认为两个NaN相等
4. 源码认为undefined和null互不相等

### isMatch && isEmpty

很好实现

### isElement

- DOM element有神马特点？

[stackoverflow](https://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object)给出了一个解决办法。

使用这行代码：`obj instancef HTMLElement`

- 源码给出的解决办法

```js
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };
```

关于[nodeType](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType)，**1**表示 **Element** 。

### isArray

使用`Object.prototype.toString.call(obj)`或者`obj instanceof Array`皆可。

源码封装了`Array.isArray`和上面第一种方法。

### isObject

这个自己想错了，不能使用`Object.prototype.toString.call(obj)`，这样就太狭隘了，只能判断普通对象了。要用 **typeof**，同事要警惕`null`。

### isArguments && isFunction && isString && isNumber && isBoolean && isDate && isRegExp && isError && isSymbol && isMap && isWeakMap

决定分开写，熟悉一下到底有多少种类型。

都使用`Object.prototype.toString.call()`进行判断。


- 这个有点惊了

把`NaN`传入`Object.prototype.toString.call()`中竟然也能得到`'[object Number]'`。首先，`NaN`是一个`number`，也就是一个`primitive`，详见[stackoverflow](https://stackoverflow.com/questions/2801601/why-does-typeof-nan-return-number)。`typeof NaN`返回`'number'`，`NaN instanceof Number`返回`false`。

继续这个话题，对于`number`和`string`类型的`primitive`，使用`Object.prototype.toString()`都能得到`'[object Number]'`和`'[object String]'`，详见这个[gist](https://gist.github.com/pbakondy/f442e91995e9d206c056)。这样的话，用这种方法来严格判断`数字对象`和`字符串对象`是分辨不出来的啊。

但源码确实使用的是这种方式。

- 布尔值判断

`Object.prototype.toString.call(true)`返回`'[object Boolean]'`

`true instanceof Boolean`返回`false`

`typeof true`返回`'boolean'`

### isFinite

惊了！！！

首先js是有原生函数来判断`Infinity/-Infinity`，这个函数就是 **全局函数**`isFinite()`。但是源码做了更多的事情诶，除了使用`isFinite`，源码还同时判断参数不是symbol类型，也不是NaN，这个有些不明白诶。

### isNaN

`Number.isNaN`是一个可靠的判断方法。MDN上给出的一个pollifill使用的是`n !== n`，自定义方法使用的是这两个方法的结合。

源码使用的方法：

```js
  _.isNaN = function(obj) {
    return _.isNumber(obj) && isNaN(obj);
  };
```

### isNull

使用这种方法：

```js
function isNull(n) {
  return n === null;
}
```
### isUndefined

使用这种方法：

```js
function isUndefined(un) {
  return un === undefined;
}
```

`isNull`以及`isUndefined`使用`Object.prototype.toString.call`可以得到`['object Null']`以及`[object Undefined]`，感觉使用这个方法也可以。