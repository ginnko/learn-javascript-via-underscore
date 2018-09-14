//underscore中关于这个函数的描述
//详见此处： https://underscorejs.org/#groupBy

//这个函数接受3个参数
//list，iteratee，context
//返回一个对象，这个对象的key是list中的元素根据iteratee计算的到的值
//每个key的值是一个数组，数组元素来自list
//也就是分组！

// underscore中这个函数的使用

const _ = require('underscore');

const arr1 = [1.3, 2.1, 2.4];
const iteratee1 = function(num){ return Math.floor(num); };

const arr2 = ['one', 'two', 'three'];
const iteratee2 = 'length';

// console.log(_.groupBy(arr1, iteratee1));
// console.log(_.groupBy(arr2, iteratee2));

//自定义groupBy函数

function groupBy(list, iteratee, context) {
  const isFunc = (iteratee) => {
    return Object.prototype.toString.call(iteratee) === '[object Function]';
  }
  const isArray = (list) => {
    return Object.prototype.toString.call(list) === '[object Array]';
  };
  const generalGetKeyFunc = (iteratee) => {
    if (isFunc(iteratee)) {
      return function(value, context) {
        return iteratee.call(context || null, value);
      };
    } else {
      return function(value) {
        return value[iteratee];
      }
    }
  }
  const getValue = generalGetKeyFunc(iteratee);


  const getGroup = (list, context) => {
    const result = {};
    const keys = !isArray(list) && Object.keys(list),
    length = keys ? keys.length : list.length;
    for (let i = 0; i < length; i++) {
      const currentKey = keys ? keys[i] : i;
      currentValue = getValue(list[currentKey], context);
      if (!isArray(result[currentValue])) {
        result[currentValue] = [];
      }
      result[currentValue].push(list[currentKey]);
    }
    return result;
  };

  return getGroup(list, context);

}

var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}, {name: 'six', age: 40}];
// console.log(groupBy(arr1, iteratee1));
// console.log(groupBy(arr2, iteratee2));
// console.log(groupBy(stooges, 'age'));

module.exports = groupBy;