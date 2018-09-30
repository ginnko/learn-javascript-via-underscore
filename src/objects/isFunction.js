// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#isFunction

function isFunction(func) {
  return Object.prototype.toString.call(func) === '[object Function]';
}
