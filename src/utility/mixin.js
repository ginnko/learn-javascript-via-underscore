// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#mixin

const _ = require('underscore');

console.log(_("fabio"));
console.log(_('test'));

const $_ = {};
function mixin(hash) {
  const key = object.keys(hash);
  $_[key[0]] = hash(key[0]);
}