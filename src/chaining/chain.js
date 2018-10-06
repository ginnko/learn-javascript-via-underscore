// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#chain

const _ = function(obj) {
  if (obj instanceof _) return obj;
  if (!(this instanceof _)) return new _(obj);
  this._wrapped = obj;
};

const chain = function(obj) {
  const instance = _(obj);
  instance._chain = true;
  return instance;
}