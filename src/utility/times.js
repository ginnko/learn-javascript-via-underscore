// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#times

function times(n, iteratee, context) {
  const result = [];
  while(n--) {
    result.push(iteratee.call(context || null, n))
  }
  return result;
}