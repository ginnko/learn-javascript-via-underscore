// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#after

// 这个函数接受两个参数
// 第一个参数是执行次数count
// 第二个参数是要被加工的函数
// 返回加工后的函数
// 运行结果显示是从第count次开始运行

// underscore中这个函数的使用

// const _ = require('underscore');

// const msg = (i) => console.log(i);
// const afteredMsg = _.after(5, msg);

// for(let i = 1; i <= 10; i++) {
//   afteredMsg(i);
// }

// 自定义after函数

function after(count, func) {
  return function() {
    if (count-- < 1) {
      return func.apply(this, arguments);
    }
  }
}

const msg = (i) => console.log(i);
const afteredMsg = after(5, msg);

for(let i = 1; i <= 10; i++) {
  afteredMsg(i);
}