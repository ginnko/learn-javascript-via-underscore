// underscore中关于这个函数的描述
// 详见此处： https://underscorejs.org/#object-functions

// Returns a sorted list of the names of every method in an object
// that is to say, the name of every function property of the object.

// 自定义functions函数
const _ = require('underscore');

function functions(obj) {
  const isFunction = (func) => {
    return Object.prototype.toString.call(func) === '[object Function]';
  };
  const func = [];
  for (let key in obj) {
    if (isFunction(obj[key])) {
      func.push(key);
    }
  }
  func.sort();
  return func;
}

console.log(functions(_));