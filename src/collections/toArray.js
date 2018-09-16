//underscore中关于这个函数的描述
//详见此处： https://underscorejs.org/#toArray

//这个函数接受1个参数，list
//作用是从任何一个可以迭代的集合(list)创建一个数组
//对于转换参数对象很有用

//underscore中的使用

// const _ = require('underscore');

// function transformFromArray() {
//   return _.toArray(arguments).slice(1);
// };

// const result = transformFromArray(1, 2, 3, 4, 5, 6);

// console.log(result);

//自定义toArray函数

function toArray(list) {
  const isArray = (list) => {
    return Object.prototype.toString.call(list) === '[object Array]';
  };
  const keys = !isArray(list) && Object.keys(list),
        length = keys ? keys.length : list.length,
        result = [];

  for (let i = 0; i < length; i++) {
    const currentKey = keys ? keys[i] : i;
    result.push(list[currentKey]);
  }
  return result;
}

function transformFromArray() {
  return toArray(arguments).slice(1);
};

const result = transformFromArray(1, 2, 3, 4, 5, 6);

console.log(result);
console.log(toArray('this'));