//underscore中关于这个函数的实现
//详见此处： https://underscorejs.org/#range

//underscore中这个函数的使用

// const _ = require('underscore');
// console.log(_.range(-1, -9, -5));

//自定义range函数

function range() {
  let start = 0,
      stop,
      step = 1;
  switch(arguments.length) {
    case 1:
      stop = arguments[0];
      break;
    case 2:
      start = arguments[0];
      stop = arguments[1];
      break;
    case 3:
      start = arguments[0];
      stop = arguments[1];
      step = arguments[2];
      break;
    default:
      break;
  }
  const result = [];
  while (Math.abs(start) < Math.abs(stop)) {
    result.push(start);
    start += step;
  }
  return result;
}

console.log(range(10));

console.log(range(1, 11));

console.log(range(0, 30, 5));

console.log(range(0, -10, -3));

console.log(range(0));
