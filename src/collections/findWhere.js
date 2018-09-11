//underscore中对这个函数的说明
//详见：https://underscorejs.org/#findWhere

//这个函数和where函数非常类似，接受两个参数
//list和property
//发现第一个满足条件的即返回
//如果list为空或者迭代一圈没有满足条件的元素则返回undefined

//underscore中这个函数的应用

// const _ = require('underscore');

// const arr = [
//   {five: 5, one: 1, two: 2},
//   {two: 2, three: 3},
//   {one: 1, two: 2, three: 3}
// ];

// const property = {one: 1, two: 2};

// console.log(_.findWhere(arr, property));

//自定义findWhere函数
//使用之前定义的find函数可以完成逻辑迭代

const find = require('./find');

function findWhere(list, property) {
  return find(list, match(property));
}

function match(property) {
  const keys = Object.keys(property),
        len = keys.length;
  return function(obj) {
    for (let i = 0; i < len; i++) {
      if (property[keys[i]] !== obj[keys[i]]) {
        return false;
      }
    }
    return true;
  }
}

const arr = [
  {five: 5, one: 1},
  {two: 2, three: 3},
  {one: 1, two: 2, three: 3}
];

const property = {one: 1, two: 2};

console.log(findWhere(arr, property));

