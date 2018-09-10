// underscore 关于each函数的用法说明
// 详见此处： https://underscorejs.org/#each

//each的功能是循环一个列表的元素，并针对一个元素应用一个传入的成为iteratee的函数，
//最后返回结果。
//如果传入了长下文，则这个iteratee函数则绑定到这个上下文上
//每一次调用iteratee函数都会传入三个参数：element，index，list
//如果list是一个对象
//则传入的参数是：value，key，list


// // underscore中的each函数

// const _ = require('underscore');

// //数组
// _.each([1, 2, 3], (ele, index, arr) => {
//   console.log(ele);
// });

// //对象
// _.each({one: 1, two: 2, three: 3}, (value, key, obj) => {
//   console.log(key);
// });

// //类数组
// (function() {
//   _.each(arguments, (ele, index, arrLike) => {
//     console.log(ele);
//   });
// })(1, 2, 3, 4);

// //针对非数组和对象的类型使用这个函数并不报错，而是什么都不执行
// _.each(() => {}, (ele, index, list) => {
//   console.log(ele, index, list);
// });


// 自定义each函数

function each(list, func, context) {
  //检查list类型的函数
  const getType = function(list) {
    return Object.prototype.toString.call(list);
  };

  //根据不同的类型进行具体操作
  if (getType(list) === '[object Array]') {
    const len = list.length;
    for (let i = 0; i < len; i++) {
      func.call(context || null, list[i], i, list);
    }
  } else if (getType(list) === '[object Object]') {
    const _arr = Object.keys(list);
    const len = _arr.length;
    for (let i = 0; i < len; i++) {
      func.call(context || null, list[_arr[i]], _arr[i], list);
    }
  }
  return list;
}

// 测试
const arr = [1, 2, 3, 4];
const obj = {one: 'one', two: 'two', three: 'three'};
const obj1 = {
  four: 'four',
  five: 'five',
  six: 'six',
  seven: 'seven',
  eight: 'eight',
  nine: 'nine',
  ten: 'ten'
};
const obj_test = {
  console: function(ele) {
    console.log(ele);
  }
};
each(arr, (ele, index, list) => {
  console.log(ele);
});
each(obj, (ele, index, list) => {
  console.log(ele);
});
each(obj1, function(ele, index, list) {
  this.console(ele);
}, obj_test);

