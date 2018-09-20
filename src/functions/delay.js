// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#delay

// 这个函数接受三个参数：
// 一个函数，等待时间以及不定数量的任意参数用来传入前面那个函数

// underscore中delay函数的使用：

const _ = require('underscore');

const log = _.bind(console.log, console);
// _.delay(log, 1000, 'logged later');

// 自定义dalay函数

function delay(func, wait, ...args) {
  setTimeout(function() {
    func.apply(null, args);
  }, wait);
}

delay(log, 1000, 'logged later');