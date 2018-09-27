// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#wrap

// 这个函数接受两个参数
// function：被包装的函数
// wrapper：另一个函数
// function会作为wrapper函数的第一个参数传入wrapper中，
// 效果是可以允许wrapper在funcion运行前或运行后执行其中的代码，
// 或者调整参数，或者按条件执行
// 返回一个加了buff的函数

// 自定义wrap函数

function wrap(func, wrapper) {
  return function() {
    Array.prototype.splice.call(arguments, 0, 0, func);
    return wrapper.apply(this, arguments);
  };
}

const hello = function(name) { return "hello: " + name; };

helloWrapped = wrap(hello, function(func) {
  return "before, " + func("moe") + ", after";
});

console.log(helloWrapped());