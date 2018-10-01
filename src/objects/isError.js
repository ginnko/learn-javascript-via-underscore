// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#isError

function isError(e) {
  return Object.prototype.toString.call(e) === '[object Error]';
}