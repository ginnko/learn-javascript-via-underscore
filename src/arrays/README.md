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


### zip

自定义zip函数的实现思路：

1. 无论是类数组还是数组，不经过判断通通转换为数组

2. 找出数组元素中包含的最多元素数量

3. 用嵌套循环拼接数组元素

源码

插一下（一种自己不太常用的i写法）：

```js
var rest = Array(length);
for (; index < length; index++) {
  rest[index] = arguments[index + startIndex];
}
```

源码的实现思路和自己的基本一致，源码是`_.zip = restArguments(_.unzip);`这样实现了`zip`函数，`restArguments`只是对参数做了整理，真正发挥作用的是`_.unzip`，其中使用了`_.pluck`。

### unzip

这个函数和zip的区别只是在于传参的方式不同。

### object

自定义object函数借用了zip，现将参数转化为一种形式后处理

源码没有借助任何函数，内部也没有啥判断，直接就是普通的`key-value`的赋值操作。感觉这种方式更为简洁。

### chunk

怎么能忘记js原生的取片段函数？！简直不可饶恕！岂可修！

果然是源码！！！！！喵！喵！喵！

自己写的代码是一个一个复制元素进行分组的，源码使用`slice`函数，感觉要快的多，而且`slice`函数本身就能处理 *index>lenghth* 的情况，喵！喵!喵!

### indexOf

这里的快速搜索算法用的二分法？是的，用的二分查找。

自定义的二分法查找算法目前没有想到返回值该如何处理...于是在这个函数外层定义了一个变量，用于保存最后的结果。

源码实现二分法查找的代码如下：

```js
var low = 0, high = getLength(array);
while (low < high) {
  var mid = Math.floor((low + high) / 2);
  if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
}
return low;
```

通过循环实现的，没有用到递归。这个明显更简单。

自定义函数和源码思路基本一直，只不过源码创建了一个创建indexOf和lastIndexOf这两个函数的工厂函数，通过传入不同的参数，构造这两个函数。

### lastIndexOf

这个函数和indexOf函数还是有区别的，这个函数不能使用二分查找。

### sortedIndex

这个函数的关键在于二分法算法函数的实现。感觉比较大小和单纯的查找值有细微的差别...第一版自己的代码无法正确比较只有两个元素，插入元素大小介于这二者之间的情况。

```js
//第一版二分法算法实现

const sortViaBinary = (array, value) => {
  const length = array.length;
  let low = 0,
      high = length - 1;
  while(low < high) {
    let mid = Math.round((low + high) / 2);
    if (array[mid] < value) {
      low = mid + 1;
    } else if (array[mid] > value) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return low;
};
```
原因肯定是上面的算法有问题，改造一下变成下面的这样了：

```js
//第二版二分法算法实现
const sortViaBinary = (array, value) => {
  const length = array.length;
  let low = 0,
      high = length;
  while(low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (array[mid] < value) {
      low = mid + 1;
    } else if (array[mid] > value) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return low;
};
```

源码的二分法实现见上，其余思路相同。

### findIndex && findLastIndex

非常好实现

考虑少了，predictate可以是函数也可以是对象，感觉字符串也是可以的，关键就是源码中的那个`cb`函数。

目前自定义的这两个函数中就分上面三种情况实现的代码。

### range

实现完毕，因为第一个参数可以省略，所以不能直接在形参里进行操作。解决办法是在函数内部使用`arguments`进行赋值。（源码是固定了形参数量，然后在代码中进行赋值）

感觉自己比源码实现的简单。

补充一个盲点：

- `Math.floor`:向下舍入
- `Math.round`:四舍五入
- `Math.ceil`:向上进位