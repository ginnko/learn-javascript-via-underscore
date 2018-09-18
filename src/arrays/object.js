//underscore中关于这个函数的说明
//详见此处： https://underscorejs.org/#object

//自定义object函数

const zip = require('./zip');

function object(key, value) {
  const pairs = value ? zip(key, value) : key;
  const result = {};
  for (let i = 0, pair; pair = pairs[i]; i++) {
    result[pair[0]] = pair[1];
  }
  return result;
}

console.log(object(['moe', 'larry', 'curly'], [30, 40, 50]));

console.log(object([['moe', 30], ['larry', 40], ['curly', 50]]));