// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#extend

// 将后面参数的属性拷贝进第一个对象
// 相同属性名后面的覆盖前面的
// 如果后面的属性是嵌套对象或属性拷贝的是其引用

// 自定义extend函数

function extend() {
  const destination = Array.prototype.splice.call(arguments, 0, 1)[0],
        length = arguments.length;

  for (let i = 0; i < length; i++) {
    const currentObj = arguments[i];
    for (let key in currentObj) {
      destination[key] = currentObj[key];
    }
  }
  return destination;

}

console.log(extend({name: 'moe'}, {age: 50}));