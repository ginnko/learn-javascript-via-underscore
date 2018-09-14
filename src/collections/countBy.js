//underscore中关于这个函数的描述
//详见此处： https://underscorejs.org/#countBy

//groupBy非常相似，只不过每个组返回的不是元素而是元素的个数

const groupBy = require('./groupBy.js');

function countBy(list, iteratee, context) {
  const group = groupBy(list, iteratee, context);
  const keys = Object.keys(group),
        length = keys.length
        result = {};
  for (let i = 0; i < length; i++) {
    const currentKey = keys[i];
    result[currentKey] = group[currentKey].length;
  }

  return result;
}

var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}, {name: 'six', age: 40}];
const arr1 = [1.3, 2.1, 2.4];
const iteratee1 = function(num){ return Math.floor(num); };

const arr2 = ['one', 'two', 'three'];
const iteratee2 = 'length';

const arr3 = [1, 2, 3, 4, 5];
const iteratee3 = function(num) {
  return num % 2 == 0 ? 'even': 'odd';
};

console.log(countBy(arr1, iteratee1));
console.log(countBy(arr2, iteratee2));
console.log(countBy(stooges, 'age'));
console.log(countBy(arr3, iteratee3));