// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#isSet

function isSet(s) {
  return Object.prototype.toString.call(s) === '[object Set]';
}