// underscore中关于这个函数的描述
// 详见此处：https://underscorejs.org/#isArguments

function isArguments(obj) {
  return Object.prototype.toString.call(obj) === '[object Arguments]';
}

(function(){ console.log(isArguments(arguments)) })(1, 2, 3);