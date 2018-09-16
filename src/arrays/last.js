//underscore中关于这个函数的说明
//详见此处： https://underscorejs.org/#last

//和first,initial函数类似
//只不过这个函数返回后n个array中的元素

//underscore中这个函数的使用

// const _ = require('underscore');

// const arr = [1, 2, 3, 4, 5, 6];

// console.log(_.last(arr, 4));

//自定义last函数

function last(array, n = 1) {
  if (n <= 1) {
    return array[array.length - 1];
  } else if (n > array.length) {
    return array;
  }
  return Array.prototype.slice.call(array, array.length - n);
}

const arr = [1, 2, 3, 4, 5, 6];

console.log(last(arr));
console.log(last(arr, -1))
console.log(last(arr, 4));
console.log(last(arr, 10));