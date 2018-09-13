//underscore中对这个函数的说明
//详见此处：https://underscorejs.org/#invoke

//这个函数接受三个参数
//list，method，arguments
//对list中的每个值都调用method方法
//传递给调用的任何额外参数都将转发到方法调用（第三个参数）
//最后返回一个数组，数组元素是list中每个元素经过methodName函数处理后的结果

//underscore中invoke函数的使用

// const _ = require('underscore');

// const arr = [[5, 1, 7], [3, 2, 1]];
// const obj = {
//   three: 3,
//   one: 1,
//   two: 2
// };

// console.log(_.invoke(arr, 'sort'));
// console.log(_.invoke(obj, 'toString'));

//自定义函数

function invoke(list, methodName, args) {
  const isArray = (list) => {
    return Object.prototype.toString.call(list) === '[object Array]';
  };
  const keys = !isArray(list) && Object.keys(list),
        length = keys ? keys.length : list.length;

  const result = [];
  let func;
  for (let i = 0; i < length; i++) {
    const currentKey = keys ? keys[i] : i;
    func = list[currentKey][methodName];
    result.push(func.call(list[currentKey], args));
  }

  return result;
}

const arr = [[5, 1, 7], [3, 2, 1]];
const obj = {
  three: 3,
  one: 1,
  two: 2
};

console.log(invoke(arr, 'join', '&'));