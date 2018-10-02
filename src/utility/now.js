// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#now

function now() {
  if(Date.now) {
    return Date.now;
  }
  return new Date().getTime();
}