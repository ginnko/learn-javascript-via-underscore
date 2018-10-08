## Utility Functions

这类函数是有特殊功能的函数集合。

这类函数的实现代码都很简单，目前都是直接看源码，查找资料解释其作用。

### noConflict

这个函数的实现原理见[此处](https://blog.csdn.net/aitangyong/article/details/44200751)

1. 先把`特殊符号的值`保存给一个变量`特殊变量替代符号`
2. 定义`noConflict`函数
3. 函数内执行两步:
    1. 将`特殊变量替代符号`保存的值重新赋给`特殊符号`
    2. 返回`this`

这个函数在浏览器环境中可以正常工作，但是在服务器环境下却无法实现想要的效果。

### identity

对这个函数作用的解释详见[此处](https://stackoverflow.com/a/25299883)，主要作用是用作 **iteratee** 感觉说的很有道理。

### constant

这个函数的作用和identity类似，只不过是作为 **predicate**。

上面这两个函数感觉都是为了不破坏接口结构或者说是为了保证接口的一致而存在的。

### noop

本质就是返回一个空函数，官网上的解释很好：

> Useful as the default for optional callback arguments

### times && random

实现很简单

### mixin

源码中是这样实现的：

```js
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  var chainResult = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  _.mixin = function(obj) {
  _.each(_.functions(obj), function(name) {
    var func = _[name] = obj[name];
    _.prototype[name] = function() {
      var args = [this._wrapped];
      push.apply(args, arguments);
      return chainResult(this, func.apply(_, args));
    };
  });
  return _;
};
```
`_`的本质是个函数，其他工具函数都定义成这个函数的属性。这个函数自己的功能实际是由这行代码`var func = _[name] = obj[name];`执行的，后面的代码用来执行`chain`功能。解释见`chain`部分。

### iteratee

很好实现

### uniqueId

没有说要随机，源码给出的是连续的整数，自己想复杂了。

```js
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };
```

### escape && unescape

源码使用`非捕获匹配`：`?:`。解释详见[这里](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

使用`RegExp()`函数创建正则对象的时候，加不加`new`关键字都是可以的。

补充：为何要转义，参见`冴羽`这篇[分析](https://github.com/mqyqingfeng/Blog/issues/77)。

不转义可能会引发 **XSS 攻击** 。

在 HTML 中，某些字符是预留的。比如说在 HTML 中不能使用小于号（<）和大于号（>），因为浏览器会误认为它们是标签。

如果我们转义，将 `<strong>123</strong>` 中的 < 和 > 转为实体字符，即 `&lt;strong&gt;123&lt;/strong&gt;`，我们再设置 innerHTML，浏览器就不会将其解释为标签，而是一段字符，最终会直接显示 `<strong>123</strong>`，这样就避免了潜在的危险。

最终要转义的符号包括：

\& --> `&amp;`

\< --> `&lt;`

\> --> `&gt;`

\" --> `&quot;`

\' --> `&#x27;`

\` --> `&#60;`


### now

`Date.now()`这个函数是从ES5开始有的，兼容版如下：

```js
function now() {
  if(Date.now) {
    return Date.now;
  }
  return new Date().getTime();
}
```

### result

不难实现

### template

template函数的实质是一个模板引擎。

underscore的模板引擎是根据`John Resig`的理论实现的，`冴羽`的这篇[文章](https://github.com/mqyqingfeng/Blog/issues/63)演示了根据`John Resig`的理论实现的一个简单模板引擎。最终代码如下：

```js
function tmpl(str, data) {
    var str = document.getElementById(str).innerHTML;

    var fn = new Function("obj",

    "var p = []; with(obj){p.push('" +

    str
    .replace(/[\r\t\n]/g, "")
    .replace(/<%=(.*?)%>/g, "');p.push($1);p.push('")
    .replace(/<%/g, "');")
    .replace(/%>/g,"p.push('")
    + "');}return p.join('');");

    var template = function(data) {
        return fn.call(this, data)
    }
    return template;
};

// 使用时
var compiled = tmpl("user_tmpl");
results.innerHTML = compiled(data);
```
上面的代码要注意一点：由字符串转成函数，使用了`Function`构造函数时：

>使用Function构造器生成的函数，并不会在创建它们的上下文中创建闭包；它们一般在全局作用域中被创建。当运行这些函数的时候，它们只能访问自己的本地变量和全局变量，不能访问Function构造器被调用生成的上下文的作用域。这和使用带有函数表达式代码的 eval 不同。

总结一下实现思路：

1. 使用正则表达式替换特殊字符

2. 使用Function构造函数从一个字符串创建一个函数

关于underscore中`template`，设计思路看的的`冴羽`这篇[分析](https://github.com/mqyqingfeng/Blog/issues/70)，下面的代码实现了underscore中template函数的主体部分：

```js
var template = function(text) {
    var matcher = RegExp([
        (settings.interpolate).source,
        (settings.evaluate).source
    ].join('|') + '|$', 'g');

    var index = 0;
    var source = "__p+='";

    text.replace(matcher, function(match, interpolate, evaluate, offset) {
        source += text.slice(index, offset).replace(escapeRegExp, function(match) {
            return '\\' + escapes[match];
        });

        index = offset + match.length;

        if (interpolate) {
            source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
        } else if (evaluate) {
            source += "';\n" + evaluate + "\n__p+='";
        }

        return match;
    });

    source += "';\n";

    source = 'with(obj||{}){\n' + source + '}\n'

    source = "var __t, __p='';" +
        source + 'return __p;\n';

    var render = new Function('obj', source);

    return render;
};
```

下面横线间的内容为理解template函数补充的基础知识

---
1. 值得注意的是，转义序列会被视为单个字符。
2. 我们常见的转义序列还有 \n 表示换行、\t 表示制表符、\r 表示回车等等。
3. 行终结符

  在ES5中，有四个字符被认为是`行终结符`，其他的折行字符都会被视为空白。

  |字符编码值|名称|
  |--------|----|
  |\u000A|换行符|
  |\u000D|回车符|
  |\u2028|行分隔符|
  |\u2029|段落分隔符|

4. 在 Function 构造函数的实现中，首先会将函数体代码字符串进行一次 ToString 操作，然后再检测代码字符串是否符合代码规范。

5. 正则表达式

>Quantifiers without ? are said to be greedy. Those with ? are called "non-greedy".

>For example, /<.*?>/ matches "`<foo>`" in "`<foo> <bar>`", whereas /<.*>/ matches "`<foo> <bar>`".

`.`匹配`行终结符`之外的任意单个字符，`\s`表示匹配一个空白符，包括空格、制表符、换页符、换行符和其他Unicode空格，`\S`匹配一个非空白符，`/[\s\S]/`才是真的匹配任意内容。underscore中就是使用了后面这种形式。

6. 先执行特殊字符的处理是因为特殊字符在 **字符串** 中会破坏其合法性。
---
