// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#defaults

// 这个函数第一个参数是对象
// 后面是不定数量的对象
// 将所有的对象属性合成一个返回新对象
// 如果后面的对象有前面的对象的属性，其属性值取前面的

function defaults() {
  const obj = Array.prototype.splice.call(arguments, 0, 1)[0],
        length = arguments.length;

  for (let i = 0; i < length; i++) {
    const currentObj = arguments[i];
    for (let key in currentObj) {
      if (!obj[key]) {
        obj[key] = currentObj[key];
      }
    }
  }
  return obj;
}

const iceCream = {flavor: "chocolate"};
console.log(defaults(iceCream, {flavor: "vanilla", sprinkles: "lots"}));