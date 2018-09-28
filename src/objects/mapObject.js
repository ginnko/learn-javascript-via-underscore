// underscore中关于这个函数的描述
// 详见此处： https://underscorejs.org/#mapObject

// 类似map函数，只不过最后返回的是一个对象
// 附加buff都加成在了对象的属性值上
// 接受三个参数
// 第一个必选：一个对象
// 第二个必选：iteratee
// 第三个可选：执行环境

function mapObject(obj, iteratee, context) {
  const keys = Object.keys(obj), result = {};
  for (let i = 0, key; key = keys[i]; i++) {
    result[key] = iteratee.call(context || null, obj[key], key, obj);
  }
  return result;
}

console.log(mapObject({start: 5, end: 12}, function(val, key) {
  return val + 5;
}));