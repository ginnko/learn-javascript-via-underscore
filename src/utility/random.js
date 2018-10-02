// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#random

function random() {
  const len = arguments.length;
  let start, end;
  if (len === 1) {
    start = 0;
    end = arguments[0];
  } else if (len === 2) {
    start = arguments[0];
    end = arguments[1];
  }

  return start + Math.floor(Math.random() * (end - start + 1));
}

console.log(random(1));
console.log(random(2));
console.log(random(3));
console.log(random(4));
console.log(random(5));
console.log(random(6));
console.log(random(7));