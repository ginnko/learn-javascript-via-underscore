//underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#size

//这个函数接受一个参数list
//返回list中元素的个数

// const _ = require('underscore');

// const arr = [1, 2, 3, 4, 5];
// const obj = {one: 1, two: 2, three: 3};

// console.log(_.size(arr));
// console.log(_.size(obj));

//自定义size函数

function size(list) {
  const isArray = (list) => {
    return Object.prototype.toString.call(list) === '[object Array]';
  };
  const keys = !isArray(list) && Object.keys(list),
        length = keys ? keys.length : list.length;
  return length;
}

const arr = [1, 2, 3, 4, 5];
const obj = {one: 1, two: 2, three: 3};

console.log(size(arr));
console.log(size(obj));