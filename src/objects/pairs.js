// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#pairs

// 这个函数会将传入的对象转为一个数组返回
// 数组的每个元素是一个包含两个元素的数组
// 第一个元素是原对象的key
// 第二个元素是key对应的value

// 自定义pairs

function pairs(obj) {
  const isObject = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Object]';
  };
  if (!isObject(obj)) {
    return [];
  }
  const keys = Object.keys(obj), result = [];
  for (let i = 0, key; key = keys[i]; i++) {
    const ele = [];
    ele[0] = key;
    ele[1] = obj[key];
    result[i] = ele;
  }
  return result;
}

console.log(pairs({one: 1, two: 2, three: 3}));