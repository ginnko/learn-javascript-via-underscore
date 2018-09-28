// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#findKey

// 这个函数接受三个参数
// object：必选
// predicate：必选
// context：可选
// 返回第一个通过predicate测试的key或者undefined

// underscore中这个函数的使用

const _ = require('underscore');

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

const predicate = (value) => {
  return value % 2 === 0;
};

// console.log(_.findKey(obj, predicate));

// 自定义findKey函数

function findKey(obj, predicate, context) {
  const keys = Object.keys(obj);
  for (let i = 0, key; key = keys[i]; i++) {
    if (predicate.call(context || null, obj[key], key, obj)) {
      return key;
    }
  }
}

console.log(findKey(obj, predicate));