//underscore中关于这个函数的说明
//详见此处： https://underscorejs.org/#partition

//这个函数接受两个参数：
//list，predictate
//作用将list中的元素按predictate的判断分成满足条件和不满足条件的两组
//返回的结果是个数组

//underscore中这个函数的使用

// const _ = require('underscore');

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const obj = {
//   one: 1,
//   two: 2,
//   three: 3,
//   four: 4,
//   five: 5,
//   six: 6,
//   seven: 7,
//   eight: 8,
//   nine: 9,
//   ten: 10
// };

// const predictate = function(num) {
//   return num % 2 === 0;
// };

// console.log(_.partition(arr, predictate));

// console.log(_.partition(obj, predictate));

//自定义partition函数

function partition(list, predictate) {
  const isArray = (list) => {
    return Object.prototype.toString.call(list) === '[object Array]';
  };
  const keys = !isArray(list) && Object.keys(list),
        length = keys ? keys.length : list.length;

  const pro = [], con = [];
  for (let i = 0; i < length; i++) {
    const currentKey = keys ? keys[i] : i;
    if (predictate(list[currentKey])) {
      pro.push(list[currentKey]);
    } else {
      con.push(list[currentKey]);
    }
  }
  return [pro, con];
}

const predictate = function(num) {
  return num % 2 === 0;
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


console.log(partition(arr, predictate));