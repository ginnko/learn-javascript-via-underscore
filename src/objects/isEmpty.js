// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#isEmpty

// 自定义isEmpty

function isEmpty(obj) {
  const getType = (obj) => {
    return Object.prototype.toString.call(obj);
  };
  if (getType(obj) === '[object Object]') {
    const keys = Object.keys(obj),
          length = keys.length;
    return !!length;
  }
  return !!obj.length;
}

console.log(isEmpty([1, 2, 3]));
console.log(isEmpty({}));