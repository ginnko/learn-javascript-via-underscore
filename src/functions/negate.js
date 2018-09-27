// underscore中关于这个函数的描述
// 详见此处： https://underscorejs.org/#negate

// 这个函数接受一个具有条件判断能力的函数
// 经过negate函数的处理会反转上面条件判断函数的处理结果

// 自定义negate函数

const _ = require('underscore');

function negate(predictate) {
  return function() {
    return !predictate.apply(this, arguments);
  };
}

var isFalsy = negate(Boolean);
console.log(_.find([-2, -1, 0, 1, 2], isFalsy));