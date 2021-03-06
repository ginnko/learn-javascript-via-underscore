// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#pick

// 这个函数第一个参数是一个对象
// 第二个参数是一个predicate函数
// 或是一个键的白名单数组
// 或是一系列键名

// 自定义pick函数

function pick() {
  const obj = Array.prototype.splice.call(arguments, 0, 1)[0],
        length = arguments.length;
  const isFunction = (func) => {
    return Object.prototype.toString.call(func) === '[object Function]';
  };
  const isArray = (arr) => {
    return Object.prototype.toString.call(arr) === '[object Array]';
  };
  const isString = (str) => {
    return Object.prototype.toString.call(str) === '[object String]';
  };

  let predicate;
  const result = {},
        keys = Object.keys(obj);

  if (length === 1) {
    if (isFunction(arguments[0])) {
      predicate = arguments[0];
      for (let i = 0, key; key = keys[i]; i++) {
        if (predicate.call(null, obj[key], key, key)) {
          result[key] = obj[key];
        }
      }
      return result;
    } else if (isArray(arguments[0])) {
      predicate = arguments[0];
    } else if (isString(arguments[0])) {
      predicate = arguments[0];
      result[predicate] = obj[predicate];
      return result;
    }
  } else if (length > 1) {
    predicate = Array.prototype.slice.call(arguments);
  }
  for (let i = 0, key; key = keys[i]; i++) {
    if (predicate.indexOf(key) !== -1) {
      result[key] = obj[key];
    }
  }
  return result;
}

console.log(pick({name: 'moe', age: 50, userid: 'moe1'}, 'name', 'age'));
console.log(pick({name: 'moe', age: 50, userid: 'moe1'}, function(value, key, object) {
  return typeof value === 'number';
}));