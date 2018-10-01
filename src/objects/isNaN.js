// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#isNaN

function isNaN(nan) {
  if (Number.isNaN) {
    return Number.isNaN(nan);
  }
  return nan !== nan;
}