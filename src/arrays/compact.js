//underscore中关于这个函数的说明
//详见此处: https://underscorejs.org/#compact

//这个函数接受一个参数list
//返回去掉假值的list的copy
//In JavaScript, false, null, 0, "", undefined and NaN are all falsy.

//underscore中这个函数的使用

// const _ = require('underscore');

// const array = [0, 1, false, '', undefined, NaN, null, 22, 3];

// console.log(_.compact(array));

//自定义compact函数

function compact(array) {
  const len = array.length;
  const result = [];
  for (let i = 0; i < len; i++) {
    if (array[i]) {
      result.push(array[i]);
    }
  }

  return result;
}

const array = [0, 1, false, '', undefined, NaN, null, 22, 3];

console.log(compact(array));