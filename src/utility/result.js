// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#result

function result(obj, path, fallback) {
  const isArray = (arr) => {
    return Object.prototype.toString.call(arr) === '[object Array]';
  };

  const isFunction = (func) => {
    return Object.prototype.toString.call(func) === '[object Function]';
  };

  if (!_.isArray(path)) path = [path];
  const length = path.length;
  if (!length) {
    return isFunction(fallback) ? fallback.call(obj) : fallback;
  }
  for (let i = 0; i < length; i++) {
    const prop = obj == null ? void 0 : obj[path[i]];
    if (prop === void 0) {
      prop = fallback;
      i = length;
    }
    obj = isFunction(prop) ? prop.call(obj) : prop;
  }
  return obj;
}