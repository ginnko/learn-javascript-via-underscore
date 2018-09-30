// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#isNumber

function isNumber(num) {
  return Object.prototype.toString.call(num) === '[object Number]';
}

const _ = require('underscore');

console.log(isNumber(2));