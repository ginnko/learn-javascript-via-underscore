//underscore文档中关于这个函数的说明
//详见此处：https://underscorejs.org/#filter

//这个函数接收三个参数
//list，predict，context
//这个函数会对list中每个元素进行循环，并在每个元素上运行predict函数
//如果这个元素满足predict的条件，则被推入一个数组
//循环迭代完成，最终返回这个数组

// underscore中的用法

// const _ = require('underscore');

// const list = [1, 2, 3, 4, 5, 6];
// const predict = (num) => {
//   return num % 2 == 0;
// };

// console.log(_.filter(list, predict));

// const obj = {
//   one: 1,
//   two: 2,
//   three: 3,
//   four: 4,
//   five: 5,
//   six: 6,
//   seven: 7,
//   eight: 8,
//   nine: 9,
//   ten: 10
// };

// const predict = (ele) => {
//   return ele % 2 === 0;
// };

// console.log(_.filter(obj, predict));

// 自定义实现filter函数

function filter(list, predict, context) {
  const isArray = (list) => {
    return Object.prototype.toString.call(list) === '[object Array]';
  };
  const keys = !isArray(list) && Object.keys(list),
        length = keys ? keys.length : list.length;

  const result = [];
  for (let i = 0; i < length; i++) {
    const currentKey = keys ? keys[i] : i;
    if (predict.call(context || null, list[currentKey], currentKey, list)) {
      result.push(list[currentKey]);
    }
  }
  return result;
}

const arr = [1, 2, 3, 4, 5, 6];
const obj = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10
};

const predict = (ele) => {
  return ele % 2 === 0;
};

console.log(filter(arr, predict));
console.log(filter(obj, predict));

//借用each函数实现filter函数

const each = require('./each');

function filterViaEach(list, predict, context) {
  const result = [];
  
  each(list, function(ele) {
    if (predict.call(context || null, ele)) {
      result.push(ele);
    }
  });
  return result;
}

console.log(filterViaEach(arr, predict));
console.log(filterViaEach(obj, predict));