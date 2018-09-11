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

### find

感觉自己的脑回路和underscore源码简直就是反着的啊...

源码在find函数中用三步实现了想要的功能：
1. 检测传入的list是普通对象还是数组，并获得相应的循环迭代函数
2. 将list，predict，context传入上面确定的迭代函数中
3. 判断返回值是否有效（这里对数组和对象做了统一的判断，使用的代码是：`key !== void 0 && key !== -1`），有效返回对应的值，无效不返回（不返回会默认返回undefined）

而自己写的代码步骤上和源码基本一致，源码设计成这样应该是从某种设计模式的角度出发的。

### filter

源码借用了上面实现的`each`方法，真香！

### where

**源码的思路更清晰：将where函数看做是filter函数的一个特殊应用，条件是包含一组特定的键值对，因此只要向这个where函数中传入待判断的list以及条件判断的函数即可。**

源码胜出！

源码中，使用`_.isMatch`这个函数来判断一个对象是否包含一个键值对

```js
_.isMatch = function(object, attrs) {
  var keys = _.keys(attrs), length = keys.length;
  if (object == null) return !length;
  var obj = Object(object);
  for (var i = 0; i < length; i++) {
    var key = keys[i];
    if (attrs[key] !== obj[key] || !(key in obj)) return false;
  }
  return true;
};
```
上面这个判断函数比自己写的要做了更多的判断：
1. 如果传入的对象是个null直接返回false
2. 如果传入的是个premitive，则先转换成一个对象
3. 如果相同key得到的value不同，则说明属性不同，同时还判断了key是否在传入的对象中

源码没有直接对`key-value`进行处理，而是进行了一个复制。

### findWhere

在这个函数中利用了前面写的find函数，find函数接受一个list参数和一个条件判断函数，所以findWhere函数可以看成是find函数的一个特例。借用find函数完成任务的关键是将`property`对象转换成为一个用于判断的函数，也就是自己代码里的match函数，这个函数返回真正的判断函数。越来越6了，666。

源码中也是这个思路。
