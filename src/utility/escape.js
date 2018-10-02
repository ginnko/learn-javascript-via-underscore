// underscore中关于这个函数的描述
// 详见此处： https://underscorejs.org/#escape

// 需要转义的html实体

const escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quote;',
  "'": '&#x27;',
  '`': '&#x60;'
};

const unescapeMap = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quote;': '"',
  '&#x27;': "'",
  '&#x60': '`'
};

const createEscaper = function(map) {
  const escaper = function(match) {
    return map[match];
  };

  const source = `(?:${Object.keys(map).join('|')})`;

  const testRegExp = RegExp(source);
  const replaceRegExp = RegExp(source, 'g');

  return function(string) {
    string = string == null ? '' : '' + string;
    return testRegExp.test(string) ? string.replace(replaceRegexp, escaper) : string;
  }
}

const escape = createEscaper(escapeMap);
const unescape = createEscape(unescapeMap);