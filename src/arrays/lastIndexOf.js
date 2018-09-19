//underscore中关于这个函数的描述
//详见此处： https://underscorejs.org/#lastIndexOf

//这个函数不能使用而分查找算法
//所以第三个参数只能指定为数字
//用来表示初始查找的位置


//underscore中这个函数的使用

// const _ = require('underscore');

// console.log(_.lastIndexOf([1, 2, 3, 4, 2, 5], 2, 3));

//自定义lastIndexOf函数

function lastIndexOf(array, value, fromIndex) {
  const length = array.length;
  let fromPos;
  if (!fromIndex || fromIndex < 0 || fromPos > length - 1) {
    fromPos = length - 1;
  } else {
    fromPos = fromIndex;
  }

  for (let i = fromPos; i > 0; i--) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

console.log(lastIndexOf([1, 2, 3, 4, 2, 5], 2));