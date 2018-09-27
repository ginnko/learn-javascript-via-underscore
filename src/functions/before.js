// underscore中关于这个函数的描述
// 详见此处： https://underscorejs.org/#before

// 这个函数也接受2个参数
// 第一个参数是执行次数count
// 第二个参数是要被before化的函数func
// 返回一个新的函数
// 这个函数的作用是允许func执行count - 1次，后面不再执行

// underscore中的使用

// const _ = require('underscore');

// const msg = function(i) {
//   return i;
// };

// const handledMsg = _.before(3, msg);

// let i = 1;
// handledMsg(i++);
// handledMsg(i++);
// handledMsg(i++);
// handledMsg(i++);
// handledMsg(i++);
// handledMsg(i++);

// 自定义before函数

function before(count, func) {
  let memorise = null;
  return function() {
    if (count-- > 1) {
      memorise = func.apply(this, arguments);
      // console.log('come from console.log1:', memorise, 'count:', count);
      return memorise;
    } else if (count <= 1) {
      // console.log('come from console.log2:', memorise, 'count:', count);
      return memorise;
    }
  };
}

const msg = i => i;

const handledMsg = before(3, msg);

let i = 1;
handledMsg(i++);
handledMsg(i++);
handledMsg(i++);
handledMsg(i++);
handledMsg(i++);
handledMsg(i++);