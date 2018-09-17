//underscore中关于这个函数的描述
//详见此处： https://underscorejs.org/#union

//这个函数接受不定数量的数组作为参数
//返回一个新的数组
//其中的元素是由参数数组不重复的元素组成

//underscore中union函数的使用

// const _ = require('underscore');

// console.log(_.union([1, 2, 3], [101, 2, 1, 10], [2, 1]));

//自定义union函数

function union() {
  const getArray = function(value) {
    return Array.prototype.slice.call(value);
  }
  const array = getArray(arguments);

  const isArrayLike = (arrayLike) => {
    return arrayLike.length && arrayLike.length >= 0 && arrayLike.length < Math.pow(2, 53) - 1;
  };
  const result = [];
  const getUniqueValue = function(valueOrArray) {
    if (isArrayLike(valueOrArray)) {
      const arrayFromArrayLike = getArray(valueOrArray),
            length = arrayFromArrayLike.length;
      for (let i = 0; i < length; i++) {
        getUniqueValue(arrayFromArrayLike[i]);
      }
    } else {
      if (result.indexOf(valueOrArray) === -1) {
        result.push(valueOrArray);
      }
    }
  }

  getUniqueValue(array);
  return result;
}

module.exports = union;

// console.log(union([1, 2, 3, 101, 2, 1, 10, 2, 1]));

