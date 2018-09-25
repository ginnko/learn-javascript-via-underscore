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

### delay

很好实现

### defer

这个函数是在调用栈空的时候立即执行经过其包装的函数，设置`setTimeout`中的时间为0。

但是源码怎么看怎么觉得是设置为了1，这是为何？

查到的说法是跟执行环境有关，在`node`和`chrome`中，0和1被认为是相同的，`firefox`中，认为0先于1,这个是新的规范？好像是诶，没有那个4毫秒了？详见[stackoverflow](https://stackoverflow.com/questions/8341803/difference-between-settimeoutfn-0-and-settimeoutfn-1)以及[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#Adding_messages#Zero_delays)。


### throttle

  - 版本1思路：

      1. 首先是`isFirstCall`，这参数定义为一个闭包，在第一次调用之后值改为`false`。
      2. `timer`也设定为一个比包，用来记录和判断setTimeout的情况。
      3. 现在的疑惑是应该在什么地方进行clearTimeout的操作，给timer重新赋值？想到的是在setTimeout的回调函数中。
    
    照上面这个写法，感觉能实现原代码中的功能1和2。测试结果ojbk。

  - 版本2思路：

      1. 给返回的函数`throttledVersion`添加一个`cancel`属性，这个属性值是一个函数，执行的操作是：

          ```js
          throttledVersion.cancel = function() {
            clearTimeout(timer);
            timer = null;
          }
          ```
    照上面这个写法，增加了功能5,测试结果ojbk。

  - 版本3思路：

      1. 添加`{leading: false}`参数，测试了下，感觉传入这个参数是禁止第一次的立即执行。这个版本中增加了下面这行判断：

        ```js
        if (option && option.leading === false) {
          isFirstCall = false;
        }
        ```

      按照上面这个写法，增加了功能3,测试结果ojbk。

  - 版本4思路：

    1. 添加`{trailing: false}`参数，感觉传入这个参数是挂起最后一次的执行。下次再次触发事件会立即执行之前挂起的程序。增加了下面这行代码的判断：

      ```js
      if (option && option.trailing === false) {
        if (timer !== null) {
          throttledVersion.cancel();
          isFirstCall = true;
        } else {
          return;
        }
      }
      ```