// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#isMap

function isMap(m) {
  return Object.prototype.toString.call(m) === '[object Map]';
}