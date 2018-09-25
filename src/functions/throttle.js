// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#throttle

// 这个函数接受三个参数：要节流的函数，等待时长，可选项
// 这个函数返回一个原函数节流版本的新函数，当重复调用这个返回函数时，
// 1. 每一个等待时长内，这个函数最多只会执行一次
// 2. 默认情况下，当你调用throttle时，将第一时间执行传入的函数
// 在这个wait时长内，你可以调用这个函数任意多次
// 3. 第三个可选参数传入{leading: false}可以禁用leading-edge调用
// 4. 第三个可选参数传入{trailing： false}可以禁用trailing-edge调用
// 5. 如果想取消预订好的节流，可以在这个throttled函数上调用cancel（）


// 调用了cancel()就彻底不执行了？
// 不太明白leading-edge和trailing-edge这两个指的是哪次调用
// 使用例子见throttleEaxmple.html

// 自定义throttle函数


// 第一版：最最基础版
// 不带第三个参数

function throttle(func, wait) {
  let isFirstCall = true,
      timer = null;
  return function() {
    if (isFirstCall === true) {
      func.call(null, arguments);
      isFirstCall = false;
    } else {
      if (timer !== null) {
        return;
      }
      timer = setTimeout(function() {
        func.call(null, arguments);
        clearTimeout(timer);
        timer = null;
      }, wait);
    }
  };
}

// 第二个版本，增加cancel

function throttle(func, wait) {
  let isFirstCall = true,
      timer = null;
  return function throttledVersion() {
    if (isFirstCall === true) {
      func.call(null, arguments);
      isFirstCall = false;
    } else {
      if (timer !== null) {
        return;
      }
      timer = setTimeout(function() {
        func.call(null, arguments);
        clearTimeout(timer);
        timer = null;
      }, wait);
    }
  };
  throttledVersion.cancel = function() {
    clearTimeout(timer);
    timer = null;
  }
}

// 第三个版本，增加对第三个参数{leading: false}

function throttle(func, wait, option) {
  let isFirstCall = true,
      timer = null;
  return function throttledVersion() {
    if (option && option.leading === false) {
      isFirstCall = false;
    }
    if (isFirstCall === true) {
      func.call(null, arguments);
      isFirstCall = false;
    } else {
      if (timer !== null) {
        return;
      }
      timer = setTimeout(function() {
        func.call(null, arguments);
        clearTimeout(timer);
        timer = null;
      }, wait);
    }
  };
  throttledVersion.cancel = function() {
    clearTimeout(timer);
    timer = null;
  }
}

// 第四个版本，增加对第三个参数{trailing：false}

function throttle(func, wait, option) {
  let isFirstCall = true,
      timer = null;
  return function throttledVersion() {
    if (option && option.leading === false) {
      isFirstCall = false;
    }
    if (option && option.trailing === false) {
      if (timer !== null) {
        throttledVersion.cancel();
        isFirstCall = true;
      } else {
        return;
      }
    }
    if (isFirstCall === true) {
      func.call(null, arguments);
      isFirstCall = false;
    } else {
      if (timer !== null) {
        return;
      }
      timer = setTimeout(function() {
        func.call(null, arguments);
        clearTimeout(timer);
        timer = null;
      }, wait);
    }
  };
  throttledVersion.cancel = function() {
    clearTimeout(timer);
    timer = null;
  }
}