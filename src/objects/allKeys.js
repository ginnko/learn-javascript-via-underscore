// underscore中关于这个函数的描述
// 详见此处： https://underscorejs.org/#allKeys

// 经测试返回的是这个对象上自己的以及显式继承来的（不包括原生的，感觉是因为原生属性被设置成不可枚举）可枚举属性。

// underscore中这个函数的使用

const _ = require('underscore');

const obj = {one: 1, two: 2, three: 3};

obj.__proto__['four'] = 4;

// console.log(_.allKeys(obj));


// 自定义allKeys函数

function allKeys(obj) {
  const isObject = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Object]';
  };

  const result = [];

  if (!isObject(obj)) {
    return [];
  }

  for (let key in obj) {
    result.push(key);
  }
  return result;
}

console.log(allKeys(obj));