//underscore中关于这个函数的说明
//相见此处： https://underscorejs.org/#difference

//这个函数第一参数是个类数组array，后面的参数是不定数量的类数组参数array*
//如果array中的元素不在任何一个array*，中，这个元素就是被选中的孩子
//最后以数组的形式返回这群被选中的孩子

//underscore中这个函数的使用

// const _ = require('underscore');

// console.log(_.difference([1, 2, 3, 4, 5], [5, 2, 10]));

//自定义difference函数

const union = require('./union');

function difference() {
  const getArray = (arrayLike) => {
    const result = [],
          length = arrayLike.length;
    for (let i = 0; i < length; i++) {
      result.push(Array.prototype.slice.call(arrayLike[i], 0));
    }
    return result;
  }
  const array = getArray(arguments),
        headArray = array.splice(0, 1)[0],
        unionArray = union(array)
        headArrayLen = headArray.length,
        unionArrayLen = unionArray.length,
        result = [];

  for (let i = 0; i < headArrayLen; i++) {
    const currentElement = headArray[i];
    let flag = true;
    for (let j = 0; j < unionArrayLen; j++) {
      if (currentElement === unionArray[j]) {
        flag = false;
        break;
      }
    }
    if (flag === true) {
      result.push(currentElement);
    }
  }
  return result;
}

console.log(difference([1, 2, 3, 4, 5], [5], [2, 3]));