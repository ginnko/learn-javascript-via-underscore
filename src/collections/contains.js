//underscore中关于这个函数的说明
//详见此处：https://underscorejs.org/#contains

//这个函数接受三个参数：
//list,value,fromIndex
//如果
//如果value在list中，则返回true
//这个函数内部使用indexOf，如果list是个数组，可以使用fromIndex来指定搜索的起点

//在underscore中的使用

// const _ = require('underscore');

// const arr = [1, 2, 3, 4, 5];
// const value = 3;
// const fromIndex = 0;

// const obj = {
//   one: 1,
//   two: 2,
//   three: 3
// };

// const value2 = 1;

// console.log(_.contains(arr, value));
// console.log(_.contains(obj, value2, fromIndex));

// 自定义contains函数

function contains(list, value, fromIndex) {
  const isArray = (list) => {
    return Object.prototype.toString.call(list) === '[object Array]';
  };
  let arr = [];
  if (!isArray(list)) {
    const keys = Object.keys(list),
          length = keys.length;
    for (let i = 0; i < length; i++) {
      arr.push(list[keys[i]]);
    }
  } else {
    arr = list;
  }
  return arr.indexOf(value, fromIndex || 0) >= 0;
}

const arr = [1, 2, 3, 4, 5];
const value = 3;
const fromIndex = 1;

const obj = {
  one: 1,
  two: 2,
  three: 3
};

const value2 = 3;

console.log(contains(arr, value, fromIndex));
console.log(contains(obj, value2, fromIndex));