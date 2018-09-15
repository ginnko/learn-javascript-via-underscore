//underscore中关于这个函数的描述
//详见此处： https://underscorejs.org/#sample

//接受两个参数：
//list,n
//如果传入n，则从list中获得n个随机数
//如果没有传，则返回一个

//underscore中这个函数的使用

// const _ = require('underscore');

// const arr = [1, 2, 3, 4, 5, 6];

// console.log(_.sample(arr));
// console.log(_.sample(arr, 3));

//自定义sample函数

function sample(list, n = 1) {
  const isArray = (list) => {
    return Object.prototype.toString.call(list) === '[object Array]';
  };

  const getKeysAndLength = (list) => {
    const keys = !isArray(list) && Object.keys(list),
          length = keys ? keys.length : list.length;

    return [keys, length];
  };
  

  const result = [];

  while(n >= 1) {
    const keys = getKeysAndLength(list)[0],
          length = getKeysAndLength(list)[1];

    const index = Math.floor(Math.random() * length);
    const currentKey = keys ? keys[index] : index;
    result.push(list[currentKey]);
    if (keys) {
      delete list[currentKey];
    } else {
      list.splice(currentKey, 1);
    }
    n--;
  }

  return result;
}


const arr = [1, 2, 3, 4, 5, 6];
const obj = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10
};

console.log(sample(obj));
console.log(sample(obj, 3));