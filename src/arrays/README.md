## Array Functions

这类函数针对`Arrays`以及`类数组对象`执行

### first & initial & last & rest & compact

这五个函数很好实现。

### flatten

这个函数的功能通过递归实现，shallow模式的判断费了些时间。自定义的`flatten`函数其实并没有实际执行`"flatten"`的功能，而是由其内部的函数执行，这样做是利用作用域，简化传参。

### without

自定义without函数内部使用了`Array.prototype.slice.call`和`Array.prototype.slice.call`两个函数，用来分离参数中的数组和排除项，然后内部再用`indexOf`进行判断。

