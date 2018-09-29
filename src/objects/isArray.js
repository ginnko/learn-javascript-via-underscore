// underscore中关于这个函数的描述
// 详见此处： https://underscorejs.org/#isArray

// 自定义isArray

function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 或者

function isArray(arr) {
  return arr instanceof Array;
}