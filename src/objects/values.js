// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#values

// 这个函数接受一个对象
// 获取这个对象自身的属性值
// 返回这些值组成的一个数组

// underscore中这个函数的使用

// const _ = require('underscore');

// const obj = {one: 1, two: 2, three: 3};
// obj['four'] = 4;

// console.log(_.values(obj));

// 自定义values函数

function values(obj) {
  const isObject = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Object]';
  };
  const keys = [], values = [];
  if (!isObject(obj)) {
    return [];
  }

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      keys.push(key);
    }
  }

  for (let i = 0, key; key = keys[i]; i++) {
    values[i] = obj(key);
  }

  return values;

}