//underscore中关于这个函数的说明
//详见此处： https://underscorejs.org/#rest

//这个函数接受2个参数
//list,n
//返回一个数组，由从n开始之后的list中的元素组成

// const _ = require('underscore');

// const arr = [1, 2, 3, 4, 5, 6];

// console.log(_.rest(arr, 10));

//自定义rest函数

function rest(array, n = 0) {
  if (n > array.length) {
    return [];
  } else if (n < 0) {
    return Array.prototype.concat.call(array);
  }
  return Array.prototype.slice.call(array, n);
}

const arr = [1, 2, 3, 4, 5, 6];

console.log(rest(arr, 2));