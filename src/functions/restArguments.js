// underscore中关于这个函数的描述
// 详见此处： https://underscorejs.org/#restArguments

// 这个函数接受两个参数
// 第一个参数是一个函数，func
// 第二个参数可选，startIndex
// 返回一个func的buff函数，姑且叫buffFunc
// buffFunc调用的时候，接受所有的从startIndex及之后的参数，（传给func的参数？）
// 并把他们放入一个单独的数组中
// func的最后一个形参用来承接这个数组
// 如果没有传一个具体的startIndex，就由func自身的参数数量来决定（怎么决定的？）
// 这个函数的功能和剩余参数的功能一样

// underscore中这个函数的使用

const _ = require('underscore');

const raceResults = _.restArguments(function(gold, silver, bronze, everyoneElse) {
  console.log(everyoneElse);
});

raceResults("Dopey", "Grumpy", "Happy", "Sneezy", "Bashful", "Sleepy", "Doc");

// 上面函数的运行结果是[ 'Sneezy', 'Bashful', 'Sleepy', 'Doc' ]，大概知道是怎么回事了

// 第一版 无startIndex

function restArguments(func) {
  const funcLen = func.length;
  return function() {

  }
}