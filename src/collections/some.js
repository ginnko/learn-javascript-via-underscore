//underscore中对这个函数的描述
//详见此处： https://underscorejs.org/#some

//这个函数接受三个参数：
//list，predicate，context
//迭代list中的每个元素，如果有一个元素通过了predicate函数的测试，则停止迭代，返回true
//如果所有元素均没有通过predicate函数的测试，则返回false

//underscore中这个函数的使用方法:

// const _ = require('underscore');

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const arr2 = [1, 3, 5, 7, 9];
// const predicate = (num) => num % 2 === 0;

// console.log(_.some(arr, predicate));
// console.log(_.some(arr2, predicate));

//自定义some函数的实现

function some(list, predicate, context) {
  const isArray = (list) => {
    return Object.prototype.toString.call(list);
  };
  const keys = !isArray(list) && Object.keys(list),
        length = keys ? keys.length : list.length;
  for (let i = 0; i < length; i++) {
    const currentKey = keys ? keys[i] : i;
    if (predicate.call(context, list[currentKey], currentKey, list)) {
      return true;
    }
  }
  return false;
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const arr2 = [1, 3, 5, 7, 9];
const predicate = (num) => num % 2 === 0;

console.log(some(arr, predicate));
console.log(some(arr2, predicate));