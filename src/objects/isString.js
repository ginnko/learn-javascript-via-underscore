// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#isString

function isString(str) {
  return Object.prototype.toString.call(str) === '[object String]';
}

const _ = require('underscore');

console.log(_.isString('123'));