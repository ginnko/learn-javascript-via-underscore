//underscore中关于这个函数的说明
//详见这里： https://underscorejs.org/#flatten

//这个函数接受两个参数：
//array和shallow
//返回展开的数组
//shallow用于控制是否只展开一层

//underscore中关于这个函数的使用

// const _ = require('underscore');

// const array = [1, [2], [3, [[4]]]];

// console.log(_.flatten(array));

// console.log(_.flatten(array, true));

//自定义flatten函数

function flatten(array, shallow) {
  const result = [];
  const isArray = (array) => {
    return Object.prototype.toString.call(array) === '[object Array]';
  };
  const getElement = (array, flag) => {
    const length = array.length;
  
    for (let i = 0; i < length; i++) {
      if (!isArray(array[i]) || flag === true) {
        result.push(array[i]);
      } else {
        if (shallow === true) {
          getElement(array[i], true);
        } else {
          getElement(array[i], false);
        }
      }
    }
  };
  getElement(array, false);
  return result;
}

const array = [1, [2], [3, [[4]]]];

console.log(flatten(array));

console.log(flatten(array, true));
