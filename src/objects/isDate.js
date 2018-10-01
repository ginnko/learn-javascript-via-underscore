// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#isDate

function isDate(d) {
  return Object.prototype.toString.call(d) === '[object Date]';
}