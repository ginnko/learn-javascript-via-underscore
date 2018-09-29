// underscore中关于这个函数的描述
// 详见此处： https://underscorejs.org/#isElement

// 自定义isElement函数

function isElement(obj) {
  return obj instanceof HTMLElement;
}