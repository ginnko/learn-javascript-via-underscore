//underscore中关于这个函数的说明
//相见这里： https://underscorejs.org/#max

//这个函数接受三个参数
//list， func， context
//如果传入了func，则依据func提供的规则
//如果传入的是个空数组，则返回-Infinity

//underscore中max函数的使用

// const _ = require('underscore');

// const stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];

// console.log(_.max(stooges, function(stooge) {
//   return stooge.age;
// }));

//自定义max函数

const map = require('./map');
const filter = require('./filter');


function max(list, func, context) {
  const isArray = (list) => {
    return Object.prototype.toString.call(list) === '[object Array]';
  };
  const keys = !isArray(list) && Object.keys(list),
        length = keys ? keys.length : list.length;
  
  let arr = [];

  if (func == null) { // 不传入函数的情况
    for (let i = 0; i < length; i++) {
      const currentKey = keys ? keys[i] : i;
      if (typeof list[currentKey] === 'number') {
        arr.push(list[currentKey]);
      }
    }
    return Math.max.apply(null, arr);
  } else { //传入函数使用特定规则的情况
    arr = map(list, func, context);
    const m = Math.max.apply(null, arr);
    return filter(list, function(value){
      return func.call(context || null, value) === m;
    })[0];
  }
}

const stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];

console.log(max(stooges, function(stooge) {
  return stooge.age;
}));

