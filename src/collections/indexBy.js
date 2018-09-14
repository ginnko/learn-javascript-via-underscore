//underscore中关于这个函数的说明
//详见此处： https://underscorejs.org/#indexBy

//这个函数接受三个参数：
//list， iteratee， context
//类似groupBy
//但返回一个对象，以键分组
// 感觉这个函数的实质就是创建一个对象属性值到原对象的引用，而且不能针对有相同属性值的情况

//underscore中这个函数的使用

const _ = require('underscore');

var stooges = [{name: 'larry', age: 50}, {name: 'curly', age: 60}, {name: 'six', age: 40}];
// console.log(_.indexBy(stooges, 'age'));

//自定义indexBy函数

function indexBy(list, iteratee, context) {
  const isFunc = (iteratee) => {
    return Object.prototype.toString.call(iteratee) === '[object Function]';
  }
  const isArray = (list) => {
    return Object.prototype.toString.call(list) === '[object Array]';
  };
  const generalGetKeyFunc = (iteratee, context) => {
    if (isFunc(iteratee)) {
      return function(value) {
        return iteratee.call(context || null, value);
      };
    } else {
      return function(value) {
        return value[iteratee];
      }
    }
  }
  const getValue = generalGetKeyFunc(iteratee);
  const getIndex = (list) => {
    const result = {};
    const keys = !isArray(list) && Object.keys(list),
    length = keys ? keys.length : list.length;
    for (let i = 0; i < length; i++) {
      currentKey = keys ? keys[i] : i;
      currentValue = getValue(list[currentKey]);
      result[currentValue] = list[currentKey];
    }
    return result;
  };
  return getIndex(list);
}


console.log(indexBy(stooges, 'age'));