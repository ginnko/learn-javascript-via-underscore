//underscore中关于这个函数的说明
//详见此处： https://underscorejs.org/#sortedIndex

//这个函数接收四个参数：
//array，value，iteratee，context
//返回插入value的位置
//搜索大小使用二分法查找算法

//自定义sortedIndex函数

const sortViaBinary = (array, value) => {
  const length = array.length;
  let low = 0,
      high = length;
  while(low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (array[mid] < value) {
      low = mid + 1;
    } else if (array[mid] > value) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return low;
};

function sortedIndex(array, value, iteratee, context) {
  const isFunc = (iteratee) => {
    return Object.prototype.toString.call(iteratee) === '[object Function]';
  };
  let computeArray = [],
      insertValue;
  if (iteratee && isFunc(iteratee)) {
    for (let i = 0, current; current = array[i]; i++) {
      computeArray.push(iteratee.call(context || null, current));
    }
    insertValue = iteratee.call(context || null, value)
  } else if (iteratee && !isFunc(iteratee)) {
    for (let i = 0, current; current = array[i]; i++) {
      computeArray.push(current[iteratee]);
    }
    insertValue = value[iteratee];
  } else if (!iteratee) {
    computeArray = array;
    insertValue = value;
  }

  return sortViaBinary(computeArray, insertValue);
}

console.log(sortedIndex([10, 20, 30, 40, 50], 15));
const stooges = [{name: 'moe', age: 40}, {name: 'curly', age: 60}];
console.log(sortedIndex(stooges, {name: 'larry', age: 50}, 'age'));