//underscore中关于这个函数的描述
//详见此处： https://underscorejs.org/#sortBy

//这个函数接受三个参数
//list，iteratee，context
//返回一个list的拷贝，这个拷贝中的元素是原列表中元素按照iteratee执行后按照升序排列的
//iteratee可以是函数，也可以是对象的键(字符串)

//underscore中的使用

// const _ = require('underscore');

// const arr1 = [1, 2, 3, 4, 5, 6];
// const iteratee11 = function(num){ return Math.sin(num); };

// const stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
// const iteratee2 = 'name';

// console.log(_.sortBy(arr1, iteratee11));
// console.log(_.sortBy(stooges, iteratee2));

//自定义sortBy

function sortBy(list, iteratee, context) {
  const isArray = (list) => {
    return Object.prototype.toString.call(list) === '[object Array]';
  };

  const isFunction = (iteratee) => {
    return Object.prototype.toString.call(iteratee) === '[object Function]';
  };

  const calculateFunc = (iteratee) => {
    if (isFunction(iteratee)) {
      return function(value, context) {
        return iteratee.call(context || null, value);
      }
    } else {
      return function(value) {
        return value[iteratee];
      }
    }
  }

  const getValue = calculateFunc(iteratee);

  //创建经过iteratee处理后生成的值和原元素之间的联系
  const link = (list, iteratee, context) => {
    const keys = !isArray(list) && Object.keys(list),
          length = keys ? keys.length : list.length
          tempObj = {},
          values = [];
    
    for (let i = 0; i < length; i++) {
      const currentKey = keys ? keys[i] : i;
      const value = getValue(list[currentKey]);
      tempObj[value] = list[currentKey];
      values.push(value);
    }

    return [tempObj, values];
  };

  const linkedObj = link(list, iteratee, context)[0];
  const linkedObjKeys = link(list, iteratee, context)[1];

  //排序
  //排序使用了选择排序
  const compare = (linkedObj, linkedObjKeys) => {
    const keys = linkedObjKeys,
          compareResult = [],
          valueResult = [];
    let length = keys.length;

    while (length >= 1) {
      let min = keys[0],
          minKey = 0;
      for (let j = 1; j < length; j++) {
        if (min > keys[j]) {
          min = keys[j];
          minKey = j;
        }
      }
      keys.splice(keys.indexOf(min), 1);
      length = keys.length;

      if (valueResult.indexOf(min) === -1) {
        compareResult.push(linkedObj[min]);
        valueResult.push(min);
      }
    }

    return compareResult;
  };
  
  return compare(linkedObj, linkedObjKeys);
}


const arr = [1, 2, 3, 4, 5, 6];
const iteratee1 = function(num){ return Math.sin(num); };

const stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
const iteratee2 = 'name';

console.log(sortBy(arr, iteratee1));
console.log(sortBy(stooges, iteratee2));