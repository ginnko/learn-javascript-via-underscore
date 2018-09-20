// underscore中这个函数的描述
// 详见此处： https://underscorejs.org/#bindAll

// 这个函数接受的第一个参数是一个对象，也就是将要绑定的对象
//后面的参数是不固定数量的一系列以字符串形式表明的函数名

// 自定义bindAll函数
const bind = require('./bind');


function bindAll(context, ...methodNames) {
  const len = methodNames.length;
  for (let i = 0; i < len; i++) {
    currentFunc = context[methodNames[i]];
    context[methodNames[i]] = bind(context, currentFunc);
  }
}