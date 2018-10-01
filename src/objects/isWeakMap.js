// underscore中关于这个函数的说明
// 详见此处：https://underscorejs.org/#isWeakMap

function isWeakMap(wm) {
  return Object.prototype.toString.call(wm) === '[object WeakMap]';
}