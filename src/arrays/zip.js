//underscore中关于这个函数的描述
//详见此处：　https://underscorejs.org/#zip

//接受不定数量的数组
//感觉每个数组的元素数量都一样吧，如果不一样会出什么问题？以undefined代替
//然后从每个数组中对应位置各揪出一个元素，拼在一起，组成一个数组
//最后返回一个新的数组包含各个单个的数组
//针对类数组对象也是有效的

//underscore中这个函数的使用

// const _ = require('underscore');

const arr1 = ['moe', 'larry', 'curly'];
const arr2 = [30, 40, 50];
const arr3 = [true, false, false];

const obj1 = {
  0: 'moe',
  1: 'larry',
  2: 'curly',
  length: 3
};
const obj2 = {
  0: 30,
  1: 40,
  2: 50,
  length: 3
};
const obj3 = {
  0: true,
  1: false,
  2: false,
  length: 3
};

// console.log(_.zip(arr1, arr2, arr3));
// console.log(_.zip(obj1, obj2, obj3));

//自定义zip函数

function zip() {
  const getArray = (arrayLike) => {
    return Array.prototype.slice.call(arrayLike);
  };
  const getArrayFromArguments = (arguments) => {
    const len = arguments.length,
          result = [];
    for (let i = 0; i < len; i++) {
      result.push(getArray(arguments[i]));
    }
    return result;
  };

  const getMaxArrayLen = (array) => {
    const len = array.length;
    let max = 0;
    for (let i = 0; i < len; i++) {
      current = array[i].length;
      if (current > max) {
        max = current;
      }
    }
    return max;
  };

  const array = getArrayFromArguments(arguments);
  const maxLen = getMaxArrayLen(array);
  const len = array.length,
        result = [];

  for (let i = 0; i < maxLen; i++) {
    const arr = [];
    for (let j = 0; j < len; j++) {
      arr.push(array[j][i]);
    }
    result.push(arr);
  }
  return result;
}

// console.log(zip(arr1, arr2, arr3));
// console.log(zip(obj1, obj2, obj3));

module.exports = zip;