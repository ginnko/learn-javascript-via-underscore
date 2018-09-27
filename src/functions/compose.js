// underscore中关于这个函数的描述
// 详见此处： https://underscorejs.org/#compose

// 这个函数接受不定数量的函数作为参数
// 以下面这种方式组合：
// composing the functions f(), g(), and h() produces f(g(h()))

// 自定义compose函数

function compose() {
  const args = arguments,
        length = args.length;
  return function() {
    let currentArgs;
    for (let i = length - 1; i >= 0; i--) {
      if (i === length - 1) {
        currentArgs = args[i].apply(this, arguments);
      } else {
        currentArgs = args[i].call(this, currentArgs);
      }
    }
    return currentArgs;
  };
}

const greet = function(name){ return "hi: " + name; };
const exclaim  = function(statement){ return statement.toUpperCase() + "!"; };

const welcome = compose(greet, exclaim);
console.log(welcome('moe'));