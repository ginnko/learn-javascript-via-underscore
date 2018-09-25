// underscore中关于这个函数的说明
// 详见此处: https://underscorejs.org/#debounce

// 这个函数接收三个参数
// 前两个和throttle一样
// 如果给第三个参数传入true，则立刻执行本次的函数


// 自定义debounce函数

// 第一版 只处理前两个参数

function debounce(func, wait) {
  let timer = null;

  return function() {
    clearTimeout(timer);
    timer = null;
    timer = setTimeout(function() {
      func.apply(null, arguments);
    }, wait);
  };
}

// 第二版 加上第三个参数

function debounce(func, wait, immediate) {
  let timer = null,
      immediateCall = true;

  return function() {
    clearTimeout(timer);
    timer = null;
    if (immediate) {
      if (immediateCall) {
        func.apply(null, arguments);
        immediateCall = false;
      } else {
        timer = setTimeout(function() {
          immediateCall = true;
        }, wait);
      }
    } else {
      timer = setTimeout(function() {
        func.apply(null, arguments);
      }, wait);
    }
  };
}