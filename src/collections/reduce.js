// underscore 关于reduce函数的用法说明
// 详见此处： https://underscorejs.org/#reduce

//这个函数的作用是将一个list中的多个元素，通过iteratee中定义的
//方法归结为单个值
//这个函数可以接受四个参数：list,iteratee,initial,context，
//其中，后两个参数是可选的
//如果没有给initial，则list中的第一个元素不参与iteratee函数
//的计算，作为初始值参与后面的计算
//iteratee函数接受四个参数：initial, element, index, list



//underscore中的reduce函数的用法

// const _ = require('underscore');

// const arr = [1, 2, 3];
// const func = function(memo, num) {
//   return memo + num;
// };

// const sum = _.reduce(arr, func, 4);

// console.log(sum);


//自定义reduce函数

function reduce(list, func, initial, context) {
  //定义检测list类型的函数
  const getType = (list) => {
    return Object.prototype.toString.call(list);
  };

  //初始值
  let ini;

  if (getType(list) === '[object Array]') {
    ini = initial || Array.prototype.shift.call(list);
    const len = list.length;
    for (let i = 0; i < len; i++) {
      ini = func.call(context || null, ini, list[i], i, list);
    }
  } else if (getType(list) === '[object Array]') {
    const keys = Object.keys(list);
    ini = initial || list[Array.prototype.shift.call(keys)];
    const len = keys.length;
    for (let i = 0; i < len; i++) {
      ini = func.call(context || null, ini, list[keys[i]], keys[i], list);
    }
  }
  return ini;
}


const arr = [[0, 1], [2, 3], [4, 5]];
const func = function(a, b) {
  return a.concat(b);
};

const sum = reduce(arr, func);

console.log(sum);
