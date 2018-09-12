// underscore中关于这个函数的描述
//详见此处：https://underscorejs.org/#reject

//filter函数的差集
//接收三个参数：
//list， predict， context
//通过predict验证的元素会被排除
//最终返回一个数组，由没有通过验证的元素组成

//underscore的用法

// const _ = require('underscore');

// const arr = [1, 2, 3, 4, 5, 6];
// const predict = num => num % 2 === 0;
// console.log(_.reject(arr, predict));

// 自定义reject函数

function reject(list, predict, context) {
  const isArray = (list) => {
    return Object.prototype.toString.call(list) === '[object Array]';
  };

  const keys = !isArray(list) && Object.keys(list),
    length = keys ? keys.length : list.length;

  const result = [];
  for (let i = 0; i < length; i++) {
    const currentKey = keys ? keys[i] : i;
    if (!predict.call(context || null, list[currentKey], currentKey, list)) {
      result.push(list[currentKey]);
    }
  }
  return result;
}

const arr = [1, 2, 3, 4, 5, 6];
const predict = num => num % 3 === 0;
console.log(reject(arr, predict));

// 利用filter构造reject函数

const filter = require('./filter');

const rejectViaFilter = (list, predict, context) => {
  const negativePredict = (predict) => {
    return function() {
      return !predict.apply(this, arguments);
    };
  };
  return filter(list, negativePredict(predict), context);
};

console.log(rejectViaFilter(arr, predict));