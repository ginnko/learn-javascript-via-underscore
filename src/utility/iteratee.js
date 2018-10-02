// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#iteratee

// 这个函数主要是统一来处理迭代函数的
function iteratee(value, context) {
  const isFunction = (func) => {
    return Object.prototype.toString.call(func) === '[object Function]';
  };

  const isObject = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Object]';
  };

  if (arguments.length === 0) {
    return function(value) {
      return value;
    };
  }

  if (isFunction(value)) {
    return value;
  }

  if (isObject(value)) {
    const keys = Object.keys(value),
          length =keys.length;
    return function(listValue, key, obj) {
      const listKeys = Object.keys(listValue);
      for (let i = 0; i < length; i++) {
        const currentKey = keys[i];
        if (listValue[currentKey] !== value[currentKey]) {
          return false;
        }
      }
      return true;
    }
  }
  
  let key = Array.prototype.slice.call(arguments)[0];
  const isArray = (arr) => {
    return Object.prototype.toString.call(arr) === '[object Array]';
  };

  if (!isArray(key)) {
    key = [key];
  }

  const length = key.length;
  return function(obj) {
    let currentObj;
    for (let i = 0; i < length; i++) {
      currentObj = i === 0 ? obj[key[i]] : currentObj[key[i]];
    }
    return currentObj;
  };
}