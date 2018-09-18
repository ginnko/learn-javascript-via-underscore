//underscore中关于这个函数的描述
//详见此处： https://underscorejs.org/#unzip

//感觉这个和zip其实很像，只是在传参的形式不同

//自定义unzip


function unzip(array) {
  const getArray = (arrayLike) => {
    return Array.prototype.slice.call(arrayLike);
  };

  const getMaxArrayLen = (array) => {
    const len = array.length;
    let max = 0;
    for (let i = 0; i < len; i++) {
      current = array[i].length;
      if (current > max) {
        max = current;
      }
    }
    return max;
  };

  const maxLen = getMaxArrayLen(array);
  const len = array.length,
        result = [];

  for (let i = 0; i < maxLen; i++) {
    const arr = [];
    for (let j = 0; j < len; j++) {
      arr.push(array[j][i]);
    }
    result.push(arr);
  }
  return result;
}

console.log(unzip([["moe", 30, true], ["larry", 40, false], ["curly", 50, false]]));