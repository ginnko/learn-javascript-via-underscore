// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#propertyOf

// property的反转？

// 自定义propertyOf函数

function propertyOf(obj) {
  return function() {
    let key = Array.prototype.slice.call(arguments)[0];
    const isArray = (arr) => {
      return Object.prototype.toString.call(arr) === '[object Array]';
    };
  
    if (!isArray(key)) {
      key = [key];
    }
  
    const length = key.length;
    let currentObj;
    for (let i = 0; i < length; i++) {
      currentObj = i === 0 ? obj[key[i]] : currentObj[key[i]];
    }
    return currentObj;
  }
}

var stooge = {moe: {fears: {worst: 'Spiders'}}, curly: {fears: {worst: 'Moe'}}};
console.log(propertyOf(stooge)(['curly', 'fears', 'worst']));