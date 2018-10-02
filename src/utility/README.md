## Utility Functions

这类函数是有特殊功能的函数集合。

这类函数的实现代码都很简单，目前都是直接看源码，查找资料解释其作用。

### noConflict

这个函数的实现原理见[此处](https://blog.csdn.net/aitangyong/article/details/44200751)

1. 先把`特殊符号的值`保存给一个变量`特殊变量替代符号`
2. 定义`noConflict`函数
3. 函数内执行两步:
    1. 将`特殊变量替代符号`保存的值重新赋给`特殊符号`
    2. 返回`this`

这个函数在浏览器环境中可以正常工作，但是在服务器环境下却无法实现想要的效果。

### identity

对这个函数作用的解释详见[此处](https://stackoverflow.com/a/25299883)，主要作用是用作 **iteratee** 感觉说的很有道理。

### constant

这个函数的作用和identity类似，只不过是作为 **predicate**。

上面这两个函数感觉都是为了不破坏接口结构或者说是为了保证接口的一致而存在的。

### noop

本质就是返回一个空函数，官网上的解释很好：

> Useful as the default for optional callback arguments

### times && random

实现很简单

### mixin

`chainResult`这部分有些看不懂，待看完`chain()`再返回头看这个。

### iteratee

很好实现

### uniqueId

没有说要随机，源码给出的是连续的整数，自己想复杂了。

```js
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };
```

### escape && unescape

源码使用`非捕获匹配`：`?:`。解释详见[这里](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

使用`RegExp()`函数创建正则对象的时候，加不加`new`关键字都是可以的。

### now

`Date.now()`这个函数是从ES5开始有的，兼容版如下：

```js
function now() {
  if(Date.now) {
    return Date.now;
  }
  return new Date().getTime();
}
```

### result

不难实现

