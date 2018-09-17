//underscore中关于这个函数的说明
//详见此处： https://underscorejs.org/#uniq

//这个函数接受三个参数
//第一个参数为一个类数组array
//第二个参数可选，表示array对象是否已经过排序，如果是，将使用更快速的算法
//第三个参数是一个可选的iteratee，用来针对array中的每个元素计算比较值
//返回不重复元素组成的新数组

//underscore中这个函数的使用

// const _ = require('underscore');

// console.log(_.uniq([1, 2, 1, 4, 1, 3], false, function(value) {
//   return value * 2;
// }));

//自定义uniq函数
const union = require('./union');

function uniq(array, isSort, iteratee) {

  getValue = (array) => {
    const isFunction = (obj) => {
      return Object.prototype.toString.call(obj) === '[object Function]';
    }
    const length = array.length,
          result = [];
    if (isFunction(iteratee)) {
      for (let i = 0; i < length; i++) {
        const current = {
          original: array[i],
          compute: iteratee(array[i])
        };
        result.push(current);
      }
    } else {
      for (let i = 0; i < length; i++) {
        const current = {
          original: array[i],
          compute: array[i][iteratee]
        };
        result.push(current);
      }
    }
    return result;
  };
  if (iteratee) {
    const computeValue = getValue(array),
          len = computeValue.length,
          result = [];

    for (let i = 0; i < len; i++) {
      const currentValue = computeValue[i].compute;
      let uniq = true;
      for (let j = i + 1; j < len; j++) {
        const compare = computeValue[j].compute;
        if (currentValue === compare) {
          uniq = false;
        }
      }
      if (uniq) {
        result.push(computeValue[i].original);
      }
    }
    return result;
  } else {
    return union(array);
  }

}

console.log(uniq([1, 2, 1, 4, 1, 3], false, function(value){
  return value * 2;
}));