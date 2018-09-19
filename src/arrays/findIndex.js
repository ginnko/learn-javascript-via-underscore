//underscore中关于这个函数的描述
//详见此处： https://underscorejs.org/#findIndex

//这个函数接受两个参数
//array和predictate
//返回第一个通过predictate测试的元素的下标
//没有的话返回-1


function findLastIndex(array, predictate, context) {
  const isFunc = (predictate) => {
    return Object.prototype.toString.call(predictate) === '[object Function]';
  };
  const isString = (predictate) => {
    return typeof predictate === 'string';
  };
  const isObject = (predictate) => {
    return Object.prototype.toString.call(predictate) === '[object Object]';
  }
  const length = array.length;
  for (let i = 0; i < length; i++) {
    if (isFunc(predictate) && predictate.call(context || null, array[i], i, array)) {
      return i;
    } else if (isString(predictate) && array[i][predictate]) {
      return i
    } else if (isObject(predictate)) {
      const key = Object.keys(predictate)[0];
        if (predictate[key] = array[i][key]) {
          return i;
        } 
    }
  }
  return -1;
}

const isEven = (num) => {
  return num % 2 === 0;
};

console.log(findIndex([1, 2, 3, 4], isEven));