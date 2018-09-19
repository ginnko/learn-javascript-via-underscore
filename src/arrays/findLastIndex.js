//underscore中关于这个函数的描述
//详见此处： https://underscorejs.org/#findLastIndex

//和findIndex函数非常类似
//只不过是倒序查找

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
  for (let i = length - 1; i > 0; i--) {
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

const users = [{'id': 1, 'name': 'Bob', 'last': 'Brown'},
             {'id': 2, 'name': 'Ted', 'last': 'White'},
             {'id': 3, 'name': 'Frank', 'last': 'James'},
             {'id': 4, 'name': 'Ted', 'last': 'Jones'}];
console.log(findLastIndex(users, {
  name: 'Ted'
}));