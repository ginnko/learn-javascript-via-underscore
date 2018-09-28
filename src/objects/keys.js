// underscore关于这个函数的描述
// 详见此处： https://underscorejs.org/#keys

// 这个函数接受一个普通对象作为参数
// 返回这个对象自身的可枚举的键名组成的数组

// 自定义keys函数

function keys(obj) {
  const result  = [];
  for(key in obj) {
    if(obj.hasOwnProperty(key)) {
      result.push(key);
    }
  }
  return result;
}

console.log(keys({one: 1, two: 2, three: 3}));