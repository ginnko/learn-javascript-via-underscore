// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#property

// 这个函数接受一个参数
// 这个参数可以是一个字符串
// 可以是字符串组成的数组
// 可以是索引组成的数组
// 返回一个函数
// 将一个对象传入这个返回的函数将返回对应key的value

// 自定义property

function property() {
  let key = Array.prototype.slice.call(arguments)[0];
  const isArray = (arr) => {
    return Object.prototype.toString.call(arr) === '[object Array]';
  };

  if (!isArray(key)) {
    key = [key];
  }

  const length = key.length;
  return function(obj) {
    let currentObj;
    for (let i = 0; i < length; i++) {
      currentObj = i === 0 ? obj[key[i]] : currentObj[key[i]];
    }
    return currentObj;
  };
}

var stooge = {name: 'moe'};
console.log('moe' === property('name')(stooge));

var stooges = {moe: {fears: {worst: 'Spiders'}}, curly: {fears: {worst: 'Moe'}}};
var curlysWorstFear = property(['curly', 'fears', 'worst']);
console.log(curlysWorstFear(stooges));