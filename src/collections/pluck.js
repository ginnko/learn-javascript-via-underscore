//underscore中关于这个函数的说明
// 详见此处：https://underscorejs.org/#pluck

//这个函数接受两个参数list和propertyName
//这个函数的效果是将list中每个元素的properyName的值推入到一个数组中
//迭代完全部元素后返回这个数组

//underscore中这个函数的使用

// const _ = require('underscore');

// const stooges = [{age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];

// console.log(_.pluck(stooges, 'name'));

//自定义pluck函数

function pluck(list, propertyName) {
  const isArray = (list) => {
    return Object.prototype.toString.call(list) === '[object Array]';
  };

  const keys = !isArray(list) && Object.keys(list),
        length = keys ? keys.length : list.length;
  
  const result = [];
  for (let i = 0; i < length; i++) {
    const currentKey = keys ? keys[i] : i;
    result.push(list[currentKey][propertyName]);
  }
  return result;
}

const stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];

console.log(pluck(stooges, 'name'));

//使用map构造pluck函数

const map = require('./map');

function pluckViaMap(list, propertyName) {
  return map(list, function(value) {
    return value[propertyName];
  });
}


console.log(pluckViaMap(stooges, 'name'));