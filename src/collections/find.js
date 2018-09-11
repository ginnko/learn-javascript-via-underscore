//underscore 中对这个函数的说明
//详见此处：https://underscorejs.org/#find

//这个函数用来查找一个list中的值
//满足条件则立即返回这个值，不再继续后面的迭代
//全部迭代完仍没有满足条件的值则返回undefined
//这个函数接受三个参数：list,predict,context

//undscore的用法

// const _ = require('underscore');

// const list = [1, 2, 3, 4, 5, 6];
// const func = (num) => {
//   return num % 2 === 0;
// };

// console.log(_.find(list, func));

//自定义find函数
//在这个函数中打算使用一下统一迭代对象和数组的循环

function find(list, predict, context) {
  const isArray = (list) => {
    return Object.prototype.toString.call(list) === '[object Array]';
  }
  const keys = !isArray(list) && Object.keys(list),
        length = keys ? keys.length : list.length;
  
  for (let i = 0; i < length; i++) {
    const currentKey = keys ? keys[i] : i;
    if (predict.call(null, list[currentKey], currentKey, list)) {
      return list[currentKey];
    }
  }
  return;
}

// const list = [1, 2, 3, 4, 5, 6];
// const func = (num) => {
//   return num % 2 === 0;
// };

// console.log(find(list, func));

module.exports = find;