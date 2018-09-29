// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#matcher

// 这个函数接受一个对象作为参数
// 返回一个函数，这个函数是一个predicate函数

// 自定义matcher函数

function matcher(attr) {
  const keys = Object.keys(attr),
        length = keys.length;
  return function(value, key, obj) {
    for (let i = 0; i < length; i++) {
      const currentKey = keys[i];
      if (obj[currentKey] !== attr[currentKey]) {
        return false;
      }
    }
    return true;
  };
}

const _ = require('underscore');

const ready = matcher({selected: true, visible: true});
const list = {
  selected: true,
  visible: true
};
const readyToGoList = _.filter(list, ready);
console.log(readyToGoList);