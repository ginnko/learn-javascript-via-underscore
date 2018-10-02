// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#noConflict


// 这个文件中仅包含测试



var _ = '123';

_ = require('../../node_modules/underscore/underscore');


var underScore = _.noConflict();

console.log(underScore);
console.log('==========================================================');
console.log(_);
