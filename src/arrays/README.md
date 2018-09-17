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

待看源码。


