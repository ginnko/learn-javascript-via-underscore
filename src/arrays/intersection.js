//underscore中关于这个函数的说明
//详见此处： https://underscorejs.org/#intersection

//这个函数接受不定数量的数组
//返回一个新的数组，数组元素由参数数组中的交集元素组成

//underscore中这个函数的使用

// const _ = require('underscore');

// console.log(_.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]));

//自定义intersection函数
const union = require('./union');

function intersection() {
  const getArray = function(obj) {
    return Array.prototype.slice.call(obj, 0);
  };
  const getAllArray = (array) => {
    const length = array.length;
    let result = [];
    for (let i = 0; i < length; i++) {
      result = result.concat(getArray(array[i]));
    }
    return result;
  };

  const wrapperArray = getArray(arguments),
        wrapperLen = wrapperArray.length,
        unionArray = union(arguments),
        allArray = getAllArray(wrapperArray),
        allArrayLen = allArray.length,
        unionArrayLen = unionArray.length,
        result = [];

  for (let i = 0; i < unionArrayLen; i++) {
    let n = 0;
    const currentElement = unionArray[i];
    for (let j = 0; j < allArrayLen; j++) {
      if (currentElement === allArray[j]) {
        n++;
      }
    }
    if (n === wrapperLen) {
      result.push(currentElement);
    }
  }
  return result;
}

console.log(intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]));