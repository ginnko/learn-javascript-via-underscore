## Function Functions

这类函数针对`函数`执行。

### bind

自定义bind函数内部使用了`apply`,由于第三个参数可有可无，且不固定数量，使用了`剩余参数`的语法。

一看不要紧，源码中这个函数的实现真的好复杂。

首先是`restArguments`函数，这个函数返回一个不定参数的函数，用于处理固定参数和剩余参数的问题，类似于剩余参数的语法。这个函数中使用`call`或是`apply`的地方，第一个地方传入的是`this`。

~~看不明白啊！卧槽！~~

[大神](https://github.com/hanzichi/underscore-analysis/issues/19)的说明。

源码中`executeBound(func, bound, context, this, args.concat(callArgs));`这行代码是考虑了被`bind`处理后返回的函数被`new`操作符处理的情况。

`executeBound`这个函数的功能是用来判断如果 *返回的函数* 是以普通方式调用，则以普通方式处理，如果以`new`关键字的方式调用，则返回一个对象。下面这行代码用来判断调用方式：

```js
if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
```

`callingContext`对应上面的`this`，`boundFunc`对应上面的`bound`，真是喵！喵！喵！

### bindAll

实现思路和源码一致。

### partial

使用`const _ = {}`解决占位符的问题。

源码中`_`表示一个函数，源码的`partial`会处理使用`new`调用函数的问题。

### memoize

单纯从例子，大概知道这个函数是干嘛的，如果传了第二个参数，则使用第二个参数计算cache的key。

这个函数实现起来很简单，源码是将cache作为memoize函数的属性来使用，自定义代码是使用了一个闭包。

要想真正发挥这个函数的效果，关键在于调用方式，比如下面这个斐波那契数列计算函数：

```js
const fibonacci = memoize(function(n) {
  return n < 2 ? n: fibonacci(n - 1) + fibonacci(n - 2);
});
```

在`fibonacci`中调用`fibonacci`效果真的很惊人...