// underscore中关于这个函数的说名
// 详见此处： https://underscorejs.org/#clone

// 返回一个对象的浅拷贝

function copy(obj) {
  const result = {};
  for (let key in obj) {
    result[key] = obj[key];
  }
  return result;
}