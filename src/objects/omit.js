// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#omit

// 类似于pick，反向返回

function omit() {
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
        if (!predicate.call(null, obj[key], key, key)) {
          result[key] = obj[key];
        }
      }
      return result;
    } else if (isArray(arguments[0])) {
      predicate = arguments[0];
    } else if (isString(arguments[0])) {
      predicate = [arguments[0]];
    }
  } else if (length > 1) {
    predicate = Array.prototype.slice.call(arguments);
  }
  for (let i = 0, key; key = keys[i]; i++) {
    if (predicate.indexOf(key) === -1) {
      result[key] = obj[key];
    }
  }
  return result;
}

console.log(omit({name: 'moe', age: 50, userid: 'moe1'}, 'userid'));
console.log(omit({name: 'moe', age: 50, userid: 'moe1'}, function(value, key, object) {
  return typeof value === 'number';
}));