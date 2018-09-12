// underscore中关于这个函数的说明
// 详见此处 https://underscorejs.org/#every

//这个函数接受三个参数：
//list，predicate，context
//迭代list每个元素进行predicate的测试
//如果每个元素都返回true，则最终返回true
//如果有一个返回false，则停止迭代，直接返回false

//underscore中的用法

// const _ = require('underscore');

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const arr2 = [2, 4, 6, 8, 10];
// const predicate = (num) => num % 2 === 0;

// console.log(_.every(arr, predicate));
// console.log(_.every(arr2, predicate));

//自定义every函数

function every(list, predicate, context) {
  const isArray = (list) => {
    return Object.prototype.toString.call(list) === '[object Array]';
  };
  const keys = !isArray(list) && Object.keys(list),
        length = keys ? keys.length : list.length;

  for (let i = 0; i < length; i++) {
    const currentKey = keys ? keys[i] : i;
    if (!predicate.call(context || null, list[currentKey], currentKey, list)) {
      return false;
    }
  }
  return true;
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const arr2 = [2, 4, 6, 8, 10];
const predicate = (num) => num % 2 === 0;

console.log(every(arr, predicate));
console.log(every(arr2, predicate));