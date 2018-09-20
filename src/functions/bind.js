//underscore中关于这个函数的描述
// 详见此处： https://underscorejs.org/#bind

// 这个函数前两个参数为
// 要绑定的函数和要绑定的对象
//后面可以接收任意数量的参数，用来作为参数传入参与绑定操作的函数
//返回一个函数

//自定义bind函数

function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function executeBound(func, boundFunc, context, callingContext, args) {
  if (!(callingContext instanceof boundFunc)) {
    return func.apply(context, args);
  }
  const voidFunc = function() {};
  voidFunc.prototype = func.prototype;
  const voidObj = new voidFunc();
  const result = func.apply(voidObj, args);
  if (isObject(result)) return result;
  return voidObj;
}

function bind(func, obj, ...arg) {
  const bound = function(...innerArg) {
    return executeBound(func, bound, obj, this, arg.concat(innerArg));
  };
  return bound;
}



// let func = function(greeting){ return greeting + ': ' + this.name };
// func = bind(func, {name: 'moe'}, 'hi');

// console.log(func());

module.exports = bind;