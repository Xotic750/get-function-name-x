/**
 * @file Get the name of the function.
 * @version 2.1.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module get-function-name-x
 */

'use strict';

var isFunction = require('is-function-x');
var functionCtr = function () {}.constructor;

var getName;
var t = function test1() {};
if (t.name === 'test1') {
  var createsAnonymous = functionCtr().name === 'anonymous';
  getName = function _getName(fn) {
    return createsAnonymous && fn.name === 'anonymous' ? '' : fn.name;
  };
} else {
  var replaceComments = require('replace-comments-x');
  var fToString = functionCtr.prototype.toString;
  var normalise = require('normalize-space-x').normalizeSpace2018;
  var reName = /^(?:async )?(?:function|class) ?(?:\* )?([\w$]+)/i;
  var stringMatch = require('cached-constructors-x').String.prototype.match;
  getName = function _getName(fn) {
    var match;
    try {
      match = stringMatch.call(normalise(replaceComments(fToString.call(fn), ' ')), reName);
      if (match) {
        var name = match[1];
        return name === 'anonymous' ? '' : name;
      }
    } catch (ignore) {}

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
  return isFunction(fn, true) ? getName(fn) : void 0;
};
