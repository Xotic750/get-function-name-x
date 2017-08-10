/**
 * @file Get the name of the function.
 * @version 2.0.1
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module get-function-name-x
 */

'use strict';

var isFunctionLike;
try {
  // eslint-disable-next-line no-new-func
  new Function('"use strict"; return class My {};')();
  isFunctionLike = function _isFunctionLike(value) {
    return typeof value === 'function';
  };
} catch (ignore) {
  isFunctionLike = require('is-function-x');
}

var getFnName;
var t = function test1() {};
if (t.name === 'test1') {
  // eslint-disable-next-line no-new-func
  var test2 = new Function();
  if (test2.name === 'anonymous') {
    getFnName = function getName(fn) {
      return fn.name === 'anonymous' ? '' : fn.name;
    };
  } else {
    getFnName = function getName(fn) {
      return fn.name;
    };
  }
} else {
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  var fToString = Function.prototype.toString;
  var s = require('white-space-x').string;
  var x = '^[' + s + ']*(?:async)?[' + s + ']*(?:function|class)[' + s + ']*\\*?[' + s + ']+([\\w\\$]+)[' + s + ']*';
  var reName = new RegExp(x, 'i');
  getFnName = function getName(fn) {
    var match;
    try {
      var str = fToString.call(fn).replace(STRIP_COMMENTS, ' ');
      match = str.match(reName);
    } catch (e) {}

    if (match) {
      var name = match[1];
      return name === 'anonymous' ? '' : name;
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
 * @example
 * var getFunctionName = require('get-function-name-x');
 *
 * getFunctionName(); // undefined
 * getFunctionName(Number.MIN_VALUE); // undefined
 * getFunctionName('abc'); // undefined
 * getFunctionName(true); // undefined
 * getFunctionName({ name: 'abc' }); // undefined
 * getFunctionName(function () {}); // ''
 * getFunctionName(new Function ()); // ''
 * getFunctionName(function test1() {}); // 'test1'
 * getFunctionName(function* test2() {}); // 'test2'
 * getFunctionName(class Test {}); // 'Test'
 */
module.exports = function getFunctionName(fn) {
  if (isFunctionLike(fn) === false) {
    return void 0;
  }

  return getFnName ? getFnName(fn) : fn.name;
};
