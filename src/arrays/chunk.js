//underscore中关于这个函数的描述
//详见此处： https://underscorejs.org/#chunk

//underscore中这个函数的使用

// const _ = require('underscore');

// console.log(_.chunk(test, 3));

//自定义chunk函数

function chunk(array, len) {
  const decludeFalsy = (arr) => {
    return arr.filter((ele) => {
      return ele !== undefined;
    });
  };
  const result = [],
        length = array.length;
  for (let i = 0; i < length; ) {
    const arr = Array(len);
    for (let j = 0; j < len; j++) {
      arr[j] = array[i++];
    }

    result.push(decludeFalsy(arr));
  }
  return result;
}

const test = ["Tyrone", "Elie", "Aidan", "Sam", "Katrina", "Billie", "Little", "Timmy"];
console.log(chunk(test, 2));
console.log(chunk(test, 3));

