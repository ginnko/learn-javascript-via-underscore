//underscore中关于这个函数的说明
//详见此处： https://underscorejs.org/#shuffle

//这个函数接受一个参数list
//效果是将list中的元素使用随机算法打乱

//underscore中的使用

// const _ = require('underscore');

// const arr = [1, 2, 3, 4, 5, 6];
// const obj = {
//   one: 1,
//   two: 2,
//   three: 3,
//   four: 4,
//   five: 5,
//   xis: 6
// };

// console.log(_.shuffle(arr));
// console.log(_.shuffle(obj));

//自定义shuffle函数

function shuffle(list) {
  const isArray = (list) => {
    return Object.prototype.toString.call(list) === '[object Array]';
  };

  const getValueToArray = (list, keys, length) => {
    const result = [];
    for (let i = 0; i < length; i++) {
      result.push(list[keys[i]]);
    }
    return result;
  }
  const keys = !isArray(list) && Object.keys(list),
        length = keys ? keys.length : list.length;
  
  const listCopy = keys ? getValueToArray(list, keys, length) : list.concat();

  let temp;
  for (let i = 0; i < length; i++) {
    let newIndex = Math.floor(Math.random() * length) + i;
    if (newIndex >= length) {
      newIndex = length - 1;
    }
    if (newIndex !== i) {
      temp = listCopy[newIndex];
      listCopy[newIndex] = listCopy[i];
      listCopy[i] = temp;
    }
  }

  return listCopy;
}

const arr = [1, 2, 3, 4, 5, 6];
const obj = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  xis: 6
};

console.log(shuffle(arr));
// console.log(shuffle(obj));