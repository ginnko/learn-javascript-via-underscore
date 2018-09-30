// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#isBoolean

function isBoolean(obj) {
  return Object.prototype.toString.call(obj) === '[object Boolean]';
}

console.log(isBoolean(true));
console.log(isBoolean(false));
console.log(isBoolean(new Boolean(true)));