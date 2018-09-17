## Array Functions

这类函数针对`Arrays`以及`类数组对象`执行

### first & initial & last & rest & compact

这五个函数很好实现。

### flatten

这个函数的功能通过递归实现，shallow模式的判断费了些时间。自定义的`flatten`函数其实并没有实际执行`"flatten"`的功能，而是由其内部的函数执行，这样做是利用作用域，简化传参。

### without

自定义without函数内部使用了`Array.prototype.slice.call`和`Array.prototype.slice.call`两个函数，用来分离参数中的数组和排除项，然后内部再用`indexOf`进行判断。

### union

这个函数很好实现，内部迭代可以用两次循环，也可以用递归。自定义函数使用了递归。

第一次写的时候，内部使用了`isArray`函数来判断，这样只能针对数组参数

第二次写的时候，内部使用`isArrayLike`函数来判断，这样对于数组或是类数组对象都是有效的

### intersection

实现这个自定义函数的思路：

1. 获取参数数组中的所有不重复元素组成一个数组union

2. 获取参数数组中的所有元素组成一个数组all

3. 嵌套一层循环，用来检查union数组中的元素，如果它出现在all数组中的次数等于参数数组的数量，这个元素就是被选中的孩子

步骤一中借用了自定义的`union`函数。

同样，这个函数内部为了方便，事先都对参数作了数组类型转换。

### difference

这个自定义函数实现类似`intersection`函数，同样借用了自定义的`union`函数。

### uniq

自定义实现用的非常笨的方法，且没有解决第二个传入isSort参数时的情况。

看了下[这个大神](https://github.com/hanzichi/underscore-analysis/issues/9)的解释,关于`isSort`参数的使用：

>如果是有序元素，当前元素只需要和上一个上一个元素比较即可！！！

看了下[大神](https://github.com/hanzichi/underscore-analysis/issues/9)关于 **数组去重**的解法说明

- 自己使用的是O(n^2) 复杂度的解法，使用`indexOf`可以简化二重循环中的内部循环（感觉本质没有变，indexOf内部依然使用了迭代，O(n^2)）：

  ```js
  function unique(a) {
    var res = [];

    for (var i = 0, len = a.length; i < len; i++) {
      var item = a[i];

      (res.indexOf(item) === -1) && res.push(item);
    }

    return res;
  }
  ```

- 再添加`filter`函数做进一步简化（感觉本质依然没有改变，只是把迭代的过程转移到了filter函数的内部，O(n^2)）：

  ```js
  function unique(a) {
    const res = a.filter(function(item, index, array) {
      return array.indexOf(item) === index; //---[1]
    });
    return res;
  }
  ```

上面标有 **`[1]`** 的那行代码真是喵！喵！喵！filter的iteratee函数可以接受三个参数：`当前元素`，`当前元素所在位置`以及`整个集合`，利用`indexOf`函数判断`当前元素`在`整个集合`中的位置是否是`参数中对应的位置`来判断是否有重复元素。

**另一个重要的问题是自定义代码的写法是假设传入的数组的元素全部为数字，但实际可以是任意元素，这就是个大问题了，尴尬...**
