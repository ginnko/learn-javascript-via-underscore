// 这个函数和reduce函数基本一样
// 就是计算的顺序是从后往前

// 自定义reduceRight函数

function reduceRight(list, func, initial, context) {
  //定义检测list类型的函数
  const getType = (list) => {
    return Object.prototype.toString.call(list);
  };

  //初始值
  let ini;

  if (getType(list) === '[object Array]') {
    ini = initial || Array.prototype.pop.call(list);
    const len = list.length;
    for (let i = len - 1; i >= 0; i--) {
      ini = func.call(context || null, ini, list[i], i, list);
    }
  } else if (getType(list) === '[object Array]') {
    const keys = Object.keys(list);
    ini = initial || list[Array.prototype.pop.call(keys)];
    const len = keys.length;
    for (let i = len - 1; i >= 0; i--) {
      ini = func.call(context || null, ini, list[keys[i]], keys[i], list);
    }
  }
  return ini;
}


const arr = [[0, 1], [2, 3], [4, 5]];
const func = function(a, b) {
  return a.concat(b);
};

const sum = reduceRight(arr, func);

console.log(sum);