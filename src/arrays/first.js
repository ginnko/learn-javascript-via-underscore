//underscore中关于这个函数的说明
//详见此处： https://underscorejs.org/#first

//这个函数接受两个参数array和n
//返回array中的前n个元素
//如果没有指定n
//则返回第一个元素

//underscore中的使用

// const _ = require('underscore');

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const num = 3;

// console.log(_.first(arr));
// console.log(_.first(arr, num));

//自定义first函数

function first(array, n = 1) {
  if (n <= 1) {
    return array[0];
  } else if (n > array.length) {
    n = array.length;
  }

  return Array.prototype.slice.call(array, 0, n);
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const num = 3;

console.log(first(arr));
console.log(first(arr, num));

const test = function() {
  console.log(first(arguments, 3));
};
test(1, 2, 3, 4, 5, 6);

