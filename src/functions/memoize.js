// underscore中这个函数的说明
// 详见此处： https://underscorejs.org/#memoize

//自定义memoize函数

function memoize(func, hasher) {
  const cache = {};
  return function() {
    const key = hasher ? hasher.apply(this, arguments) : func.name + '-' + Array.prototype.join.call(arguments, '-');

    if (cache[key]) {
      return cache[key];
    } else {
      return cache[key] = func.apply(this, arguments);
    }
  };
}

const fibonacci = memoize(function(n) {
  return n < 2 ? n: fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(10));