//underscore中关于这个函数的说明
//详见此处： https://underscorejs.org/#initial

//这个函数接受两个参数array和n
//返回一个排除了array中后n个元素的数组

//underscore中这个函数的使用

// const _ = require('underscore');

// const arr = [1, 2, 3, 4, 5, 6];

// console.log(_.initial(arr));

//自定义initial函数

function initial(array, n = 1) {
  if (n <= 1) {
    return Array.prototype.slice.call(array, 0, array.length - 1);
  } else if (n > array.length) {
    return [];
  }

  return Array.prototype.slice.call(array, 0, array.length - n);
}

const arr = [1, 2, 3, 4, 5, 6];

console.log(initial(arr));

console.log(initial(arr, -1));

console.log(initial(arr, 3));

console.log(initial(arr, 10));

