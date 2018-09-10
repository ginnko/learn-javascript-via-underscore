## Collection Functions

这类函数针对`Arrays`以及`Objects`都能有效执行

### each

#### 判断是否是数组的方法：

1. ~~typeof运算符~~

  这种方法不行的原因是js将`typeof array`的结果归于`object`，无法区别对象和数组

2. instance

  这种方法可行

  `obj instance Constructor`

  instance的运行原理是检测某个构造函数的`prototype`指向的对象是否在`obj`的原型链上

3. Object.prototype.toString.call()

  对于数组，返回`"[object Array]"`

  对于对象，返回`"[object Object]"`

  对于参数列表，返回`"[object Arguments]"`，惊了！居然能识别到这个程度

4. Array.isArray()

  最稳妥的方法，常和方法3封装在一起用来解决兼容性

#### 源码中关于数组和对象的判断

源码中并没有使用上述方法严格区别数组和对象，而是：

1. 无论是普通对象，还是数组，还是类数组，源码都将他们视为`对象`

2. 获取这个`对象`中的`length`属性

3. 如果这个`length`属性是`number`类型，并且数值`大于等于0`且`小于等于2的53次方减1`。

满足上面条件的对象就使用循环数组的方法对每个元素执行函数，不满足上述条件的就使用循环对象的方法对每个元素执行函数。

最后还返回了原对象。

### map

#### 数组和对象使用一套循环工作的方法

```js
var keys = !isArray(obj) && _.keys(obj),//这里的keys是关键啊！
    length = (keys || obj).length,
    results = Array(length);

for (var index = 0; index < length; index++) {
  var currentKey = keys ? keys[index] : index; // 这里的currentKey也是个关键！
  results[index] = iteratee(obj[currentKey], currentKey, obj);
}
```

### reduce and reduceRight

**到这里先插一句话：之前看设计模式里，就会常用这种分离具体执行结果的代码和通用方法的写法，忘记这是什么模式了...需要复习一下。**

单独实现每个函数其实没有什么难度，写法也和前面each,map两个函数思路基本一致。巧妙地是源码写了一个工厂函数，然后通过传入不同的参数直接造出`reduce`和`reduceRight`两个函数。

下面是这个工厂函数的源码：

```js
var createReduce = function(dir) {
  var reducer = function(obj, iteratee, memo, initial) {
    //下面（73-81）这几行代码真是巧妙极了
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        index = dir > 0 ? 0 : length - 1;
    
    if (!initial) {
      memo = obj[keys ? keys[index] : index];
      index += dir;
    }
    for (; index >= 0 && index < length; index += dir) {
      var currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  return function(obj, iteratee, memo, context) {
    var initial = arguments.length >= 3;
    return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
  };
};

//分别创建reduce和reduceRight两个函数

reduce = createReduce(1);
reduceRight = createReduce(-1);
```

**还有另外一个问题，underscore源码中有专门的函数用来处理iteratee函数的this绑定和传参的问题，但是想了想，在功能的实现上貌似没有什么差别，暂时就先这么着吧。**