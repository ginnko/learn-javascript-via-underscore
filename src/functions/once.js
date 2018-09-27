// underscore中关于这个函数的描述
// 详见此处： https://underscorejs.org/#once

// 接受一个参数func
// 返回一个处理后的函数
// 这个函数即便被多次调用也只会在第一次调用的时候执行

// underscore中这个函数的使用

// const _ = require('underscore');

// const showMsg = () => console.log('haha');

// const onlyOnce = _.once(showMsg);

// onlyOnce();
// onlyOnce();
// onlyOnce();
// onlyOnce();

// 自定义once函数

function once(func) {
  let count = 0, result = null;
  function onceHandledFunc() {
    if (count === 0) {
      result = func.apply(this, arguments);
      count++;
    }
    return result;
  }
  return onceHandledFunc;
}

const haMsg = () => console.log('haha');
const heiMsg = () => console.log('heihei');

const onlyHa = once(haMsg);
const onlyHei = once(heiMsg);

onlyHa();
onlyHa();
onlyHa();

onlyHei();
onlyHei();
onlyHei();
