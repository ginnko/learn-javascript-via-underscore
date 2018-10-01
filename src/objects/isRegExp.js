// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#isRegExp

function isRegExp(d) {
  return Object.prototype.toString.call(d) === '[object RegExp]';
}

console.log(isRegExp(/[a-z]/g));