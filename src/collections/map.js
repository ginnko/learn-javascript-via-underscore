// underscore 关于map函数的用法说明
// 详见此处： https://underscorejs.org/#map

//和each函数类似，只不过是对每一个list中的元素都应用传入的函数，并且返回一个新的值，
//整个循环完返回这些新值组成的数组
//这个函数依然是对数组、类数组、普通对象皆有效

// //underscore中的map函数的用法

// const _ = require('underscore');

// arr1 = [1, 2, 3];
// func1 = function(num) {
//   return num * 3;
// };

// obj2 = {
//   one: 1,
//   two: 2,
//   three: 3
// };
// func2 = function(num, key) {
//   return num * 3;
// };

// console.log(_.map(arr1, func1));
// console.log(_.map(obj2, func2));

//自定义map方法

function map(obj, func, context) {
  //检测obj的类型
  const getType = (obj) => {
    return Object.prototype.toString.call(obj);
  };

  const result = [];

  if (getType(obj) === '[object Array]') {
    const len = obj.length;
    for (let i = 0; i < len; i++) {
      result.push(func.call(context || null, obj[i], i, obj));
    }
  } else if (getType(obj) === '[object Object]') {
    const keys = Object.keys(obj);
    const len = keys.length;
    for (let i = 0; i < len; i++) {
      result.push(func.call(context || null, obj[keys[i]], keys[i], obj));
    }
  }
  return result;
}

arr1 = [1, 2, 3];
func1 = function(num) {
  return num * 3;
};

obj2 = {
  one: 1,
  two: 2,
  three: 3
};
func2 = function(num, key) {
  return num * 3;
};

// console.log(map(arr1, func1));
// console.log(map(obj2, func2));

module.exports = map;