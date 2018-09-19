//underscore中关于这个函数的说明
//详见此处： https://underscorejs.org/#indexOf

//这个函数接受三个参数
//第一个是一个数组，第二个是要查找的目标
//第三个可以是布尔值true，用来表示第一个参数数组是经过排序的
//也可以是一个数字，用来表示从这个数字之后开始查找第一个符合的位置

//自定义indexOf函数



function indexOf(array, value, isSorted) {

  let bingoIndex;
  const sortViaBinary = (array, value) => {
    const len = array.length,
          middleIndex = Math.floor(len / 2);
    if (len > 0) {
      if (value > array[middleIndex]) {
        const largePart = array.silce(middleIndex + 1);
        sortViaBinary(maxPart, value);
      } else if (value < array[middleIndex]) {
        const littlePart = array.slice(0, middleIndex);
        sortViaBinary(littlePart, value);
      } else if (value === array[middleIndex]) {
        bingoIndex = middleIndex;
      }
    } else {
      bingoIndex = -1;
    }
  };

  if (isSorted === true) {
    sortViaBinary(array, value);
    return bingoIndex;
  } else {
    const startIndex = typeof isSorted === 'number' ? isSorted : 0;
    for (let i = startIndex, currentValue; currentValue = array[i]; i++) {
      if (currentValue === value) {
        return i;
      }
    }
    return -1;
  }
}

console.log(indexOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1));