import isFunction from 'is-function-x';
import replaceComments from 'replace-comments-x';
import normalise from 'normalize-space-x';
var functionCtr = isFunction.constructor;
var $getName;
/* eslint-disable-next-line lodash/prefer-noop */

var t = function test1() {};

if (t.name === 'test1') {
  var createsAnonymous = functionCtr().name === 'anonymous';

  $getName = function getName(fn) {
    return createsAnonymous && fn.name === 'anonymous' ? '' : fn.name;
  };
} else {
  var fToString = functionCtr.toString;
  var reName = /^(?:async )?(?:function|class) ?(?:\* )?([\w$]+)/i;
  var stringMatch = ''.match;

  $getName = function getName(fn) {
    var match;

    try {
      match = stringMatch.call(normalise(replaceComments(fToString.call(fn), ' ')), reName);

      if (match) {
        var name = match[1];
        return name === 'anonymous' ? '' : name;
      }
    } catch (ignore) {// empty
    }

    return '';
  };
}
/**
 * This method returns the name of the function, or `undefined` if not
 * a function.
 *
 * @param {Function} fn - The function to get the name of.
 * @returns {undefined|string} The name of the function,  or `undefined` if
 *  not a function.
 */


export default function getFunctionName(fn) {
  /* eslint-disable-next-line no-void */
  return isFunction(fn, true) ? $getName(fn) : void 0;
}

//# sourceMappingURL=get-function-name-x.esm.js.map