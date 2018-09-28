// underscore中关于这个函数的实现
// 详见此处： https://underscorejs.org/#invert

// 反转键值

// 自定义invert

function invert(obj) {
  const keys = Object.keys(obj), result = {};
  for (let i = 0, key; key = keys[i]; i++) {
    result[obj[key]] = key;
  }
  return result;
}

console.log(invert({Moe: "Moses", Larry: "Louis", Curly: "Jerome"}));