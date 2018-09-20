// underscore中关于这个函数的说明
// 详见此处： https://underscorejs.org/#defer

// 自定义defer函数

function defer(func, ...args) {
  setTimeout(function(){
    func.apply(null, args)
  }, 0);
}

defer(console.log, 'haha');