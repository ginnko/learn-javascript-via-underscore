// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#isMatch

// 自定义isMatch函数

function isMatch(obj, prop) {
  const keys = Object.keys(prop),
        length = keys.length;

  for (let i = 0; i < length; i++) {
    const currentKey = keys[i];
    if(obj[currentKey] !== prop[currentKey]) {
      return false;
    }
  }

  return true;
}

const stooge = {name: 'moe', age: 32};
console.log(isMatch(stooge, {age: 32}));