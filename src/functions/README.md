## Function Functions

这类函数针对`函数`执行。

- 个人觉得像`once`，`after`，`before`这三个函数关键不在于实现，而在于应用场景，这个要看一下。

- `_.partial`这个函数真的很复杂...在后面多个函数中都有用到，要看一下。

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

    1. 添加`{trailing: false}`参数，感觉传入这个参数是挂起最后一次的执行。下次再次触发事件会立即执行之前挂起的程序。加了下面几行代码：

    ```js
    timer = setTimeout(function() {
      if(option && option.trailing === false) {
        clearTimeout(timer);
        timer = null;
        isFirstCall = true;
        return;
      }
      func.call(null, arguments);
      clearTimeout(timer);
      timer = null;
    }, wait);
    ```

    按照上面这个写法，增加了功能4,测试结果ojbk,但感觉是比实际的wait时间要长一点。

对比源码，整体思路是一样的。区别在于，源码是综合使用 **定时器** 和 **时间戳**，而自己定义的节流函数只使用了 **定时器**，个人感觉在功能上没有差别。

### debounce

  - 版本1思路:

    实现相当简单,只要进入`debounced`函数就`清除timer`,并`赋值null`

    测试也ojbk。

  - 版本2思路：
  
    如果第三个参数传入了`true`，如果此时`immediateCall`参数为真，则立即执行`func`，执行后，给`immediateCall`赋假值，然后设定一个wait的定时器，时间到了给`immediateCall`赋真值。

    测试也ojbk。

    大体感觉和源码的实现思路一致。

### once

实现思路：返回一个新的函数，函数中有一个闭包变量，用来判断参数函数是否已经执行过了。

源码借用了`_.partial`和`_.before`两个函数。暂且先往后写。

### after

运行结果显示是源码从第count次开始运行，感觉这个不科学。

自定义after函数设计为从count次运行之后开始执行。

设计思路差不多，但源码比自己的代码写的简洁,改为源码的写法。

### before

源码中，在函数运行count次之后，会执行这行代码：`func = null;`，感觉这么做没有必要诶...这是如何考虑的？想不明白。

### wrap

感觉具体的效果逻辑都在参数`wrapper`函数中？`wrap`只是处理一下参数，将`func`作为`wrapper`第一个参数传入？

依照上面的思路设计，具体的代码出问题了！

自定义代码如下：

```js
const args = Array.prototype.splice.call(arguments, 0, 0, func);
```

乍一看以为是把函数保存成数组元素会出问题，但细想怎么会有问题，不过是有索引的对象属性值，依然是有效的函数。

原因在于`Array.prototype.splice.call(arguments, 0, 0, func)`是直接在`arguments`上修改的，返回给`args`的是个空数组。

源码是使用`_.partial`，这就赋予了经过`wrapper`处理后的函数具有可以使用`new`关键字进行调用的能力了。

自己写的只是一个简单版本。

**有必要手动实现一个复杂版本。**

### negate

实现和源码完全一样。

### compose

这么多个函数，如何处理其中的this指向？目前决定都和返回的函数绑定。

实现思路：从后往前迭代`arguments`类数组对象中的函数，`arguments[length - 1]`这个函数接受的参数是传入返回的新函数中的参数，其他函数接受的是前一个函数的计算结果。

测试结果ojbk。

和源码实现思路一样。

### restArguments

这个函数实现的功能就是剩余参数的功能，在underscore中构造其他函数时，多次用到，是一个核心函数。

下面是自定义函数的实现思路：

- 第一版

没有第二个startIndex参数

利用函数的`length`，这个属性表示形参的数量。