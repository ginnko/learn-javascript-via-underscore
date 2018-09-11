//underscore中关于where函数的定义
//详见：https://underscorejs.org/#where

//这个函数接受两个参数
//list和properties
//properties中是key-value的pairs
//返回一个数组，数组中的元素是由满足key-value组成的

//underscore的用法

// const _ = require('underscore');

// const arr = [
//   {five: 5, one: 1, two: 2},
//   {two: 2, three: 3},
//   {one: 1, two: 2, three: 3}
// ];

// const property = {one: 1, two: 2};

// const obj = {
//   a: {five: 5, one: 1, two: 2},
//   b: {two: 2, three: 3},
//   c: {one: 1, two: 2, three: 3}
// };

// console.log(_.where(arr, property));
// console.log(_.where(obj, property));

//自定义where函数

function where(list, property) {
  const isArray = (list) => {
    return Object.prototype.toString.call(list) === '[object Array]';
  };
  const keys = !isArray(list) && Object.keys(list),
        length = keys ? keys.length : list.length;
  const propertyKeys = Object.keys(property),
        propertyLen = propertyKeys.length;  
  const result = [];
  for (let i = 0; i < length; i++) {
    const currentKey = keys ? keys[i] : i;
    let flag = true;
    for (let j = 0; j < propertyLen; j++) {
      if (property[propertyKeys[j]] !== list[currentKey][propertyKeys[j]]) {
        flag = false;
        break;
      }
    }
    if (flag === true) {
      result.push(list[currentKey]);
    }
  }
  return result;
}

const arr = [
  {five: 5, one: 1, two: 2},
  {two: 2, three: 3},
  {one: 1, two: 2, three: 3}
];

const property = {one: 1, two: 2};

const obj = {
  a: {five: 5, one: 1, two: 2},
  b: {two: 2, three: 3},
  c: {one: 1, two: 2, three: 3}
};

console.log(where(arr, property));
console.log(where(obj, property));