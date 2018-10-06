## Chaining Functions

这个系列包含两个函数 **chain** 和 **value**。

### chain

这个函数借用了下面这段创建 **_** 对象的代码：

```js
const _ = function(obj) {
  if (obj instanceof _) return obj;
  if (!(this instanceof _)) return new _(obj);
  this._wrapped = obj;
};
```

其中`this._wrapped = obj;`这行代码将在`return new _(obj)`的时候执行

这个函数的本质就是返回了一个`_`的对象实例。

**_的本质是是一个函数**，之前定义的那一堆函数本质都是这个函数的属性。使用`_()`则会返回一个新的对象`newObj`，通过执行`_.mixin(_)`，已经把之前定义的所有的函数都复制到了`newObj.__proto__`上。只要`instance._chain`为真，就能连续调用方法。

### value

这个就不言自明了

```js
  _.prototype.value = function() {
    return this._wrapped;
  };
```
