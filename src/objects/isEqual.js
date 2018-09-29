// underscore中关于这个函数的描述
// 详见此处： https://underscorejs.org/#isEqual

// 判断两个对象是否相等，执行深度比较算法
// 深度比较只针对一般对象和数组有效

// 自定义isEqual

function isEqual(object, other) {
  const giveType = (obj) => {
    return Object.prototype.toString.call(obj);
  };

  function specificObjectComparasion(object, other) {
    const type = giveType(object);
    switch(type) {
      case '[object RegExp]':
      case '[object String]':
      case '[object Boolean]':
        return `${object}` === `${other}`;
      case '[object Number]':
      case '[object Date]':
        return +object === +other;
      case '[object Symbol]':
        return Symbol.prototype.valueOf.call(object) === Symbol.prototype.valueOf.call(other);
    }
  }

  function compare(object, other) {
    if (giveType(object) === '[object Function]' || giveType(other) === '[object Function]') {
      return false;
    }

    if (giveType(object) !== giveType(other)) {
      return false;
    }

    if (!specificObjectComparasion(object, other)) {
      return false;
    }
    if (typeof object === 'number' || typeof object === 'string' || typeof object === 'boolean' || typeof object === 'undefined') {
      return object === other;
    }

    if (object === null) {
      return object === other;
    }

    const objectKeys = giveType(object) === '[object Object]' ? Object.keys(object) : null,
          objectLen = objectKeys ? objectKeys.length : object.length,
          otherKeys = giveType(other) === '[object Object]' ? Object.keys(object) : null,
          otherLen = otherKeys ? otherKeys.length : other.length;
    if (objectLen !== otherLen) {
      return false;
    }
    for (let i = 0; i < objectLen; i++) {
      const currentKey = objectKeys ? objectKeys[i] : i;
      if (objectKeys && otherKeys.indexOf(currentKey) === -1) {
        return false;
      }
      if (typeof object[currentKey] === 'number' || typeof object[currentKey] === 'string' || typeof object[currentKey] === 'boolean' || typeof object === 'undefined') {
        if (object[currentKey] !== other[currentKey]) {
          return false;
        }
      } else {
        if (!specificObjectComparasion(object[currentKey], other[currentKey])) {
          return false;
        }
        if (!compare(object[currentKey], other[currentKey])) {
          return false;
        }
      }
    }
    return true;
  }

  return compare(object, other);
}

// const _ = require('underscore');

// const obj1 = function(){};

// const obj2 = function(){};

// console.log(_.isEqual(obj1, obj2));

console.log(isEqual({name: 'moe', luckyNumbers: [13, 27, 34]}, {name: 'moe', luckyNumber: [13, 27, 34]}));