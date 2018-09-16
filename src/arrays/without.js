//underscore中关于这个函数的描述
//详见此处： https://underscorejs.org/#without

//这个函数第一个参数是一个array，后面的参数都是单个的值，没有明确数量限制
//返回一个数组，其中的元素是抛去单个值的array的copy

//underscore 中这个函数的使用

const _ = require('underscore');

// console.log(_.without([1, 2, 1, 0, 3, 1, 4], 0, 1));

//自定义without函数

function without() {
  const array = Array.prototype.splice.call(arguments, 0, 1)[0];
  const test = Array.prototype.slice.call(arguments, 0);
  const length = array.length;
  const result = [];
  for (let i = 0; i < length; i++) {
    if(test.indexOf(array[i]) === -1) {
      result.push(array[i]);
    }
  }
  return result;
}

console.log(without([1, 2, 1, 0, 3, 1, 4], 0, 1));