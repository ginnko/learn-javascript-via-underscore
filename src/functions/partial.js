//underscore中关于这个函数的说明
//详见此处： https://underscorejs.org/#partial

// 这个函数第一个参数接受一个函数
// 后面的参数是不固定数量的任意参数
// 用来pre-fill第一个参数函数的参数
// 可以使用_这个标志作为参数的站位符
// 不改变原来函数的this

// 自定义partial函数

const _ = {};
function partial(func, ...outerArgs) {
  return function(...innerArgs) {
    const outerLen = outerArgs.length;
    const placeholder = [];
    for (let i = 0; i < outerLen; i++) {
      if (outerArgs[i] === _) {
        placeholder.push(i);
      }
    }
    const placeholderLen = placeholder.length;
    if (placeholderLen === 0) {
      return func.apply(this, outerArgs.concat(innerArgs));
    } else {
      for (let i = 0; i < placeholderLen; i++) {
        outerArgs.splice(placeholder[i], 1, innerArgs.splice(i, 1));
      }
      return func.apply(this, outerArgs.concat(innerArgs));
    }
  };
}

const subtract = function(a, b) { return b - a; };
const sub5 = partial(subtract, 5);
console.log(sub5(20));

const subFrom20 = partial(subtract, _ , 20);
console.log(subFrom20(5));