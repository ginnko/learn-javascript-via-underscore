// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#isObject

// 自定义isObject

// 下面这种写法太狭隘了！！！

// function isObject(obj) {
//   return Object.prototype.toString.call(obj) === '[object Object]';
// }

// 使用typeof来判断

function isObject(obj) {
  return typeof obj === 'function' || typeof obj === 'object' && !!obj;
}