// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#extendOwn

// 仅拷贝sources的自己的属性

// 自定义extendOwn函数

function extendOwn() {
  const destination = Array.prototype.splice.call(arguments, 0, 1)[0],
        length = arguments.length;
  
  for (let i = 0; i < length; i++) {
    const currentObj = arguments[i],
          keys = Object.keys(currentObj);

    for (let j = 0, key; key = keys[j]; j++) {
      destination[key] = currentObj[key];
    }
  }
  return destination;
}

const source = {age: 50};
source.__proto__.life = 100;
console.log(extendOwn({name: 'moe'}, source));