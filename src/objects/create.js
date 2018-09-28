// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#create

// 自定义create

function create(obj, prop) {
  const voidObject = function() {};
  voidPbject.prototype = obj;
  const newObject = new voidObject();
  const keys = Object.keys(prop);
  for (let i = 0, key; key = keys[i]; i++) {
    newObject[key] = obj[key];
  }
  return newObject;
}