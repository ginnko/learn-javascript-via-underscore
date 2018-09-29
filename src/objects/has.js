// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#has

// 第一个参数是一个对象
// 第二个参数可以是一个字符串，也可以是一个字符串组成的数组
// 返回布尔值

function has(obj, key) {
  const isArray = (arr) => {
    return Object.prototype.toString.call(arr) === '[object Array]';
  };
  if (!isArray(key)) {
    return obj && Object.prototype.hasOwnProperty.call(obj, key);
  }
  const length = key.length;
  for (let i = 0; i < length; i++) {
    const currentKey = key[i];
    if (!(obj && Object.prototype.hasOwnProperty.call(obj, currentKey))) {
      return false;
    }
  }
  return true;
}

console.log(has({a: 1, b: 2, c: 3}, "b"));
console.log(has({a: 1, b: 2, c: 3}, ["b", 'd']));
