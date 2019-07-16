/**
 * @file Get the name of the function.
 * @version 2.1.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module get-function-name-x
 */

import isFunction from 'is-function-x';

const functionCtr = function() {}.constructor;

let getName;
const t = function test1() {};

if (t.name === 'test1') {
  const createsAnonymous = functionCtr().name === 'anonymous';
  getName = function _getName(fn) {
    return createsAnonymous && fn.name === 'anonymous' ? '' : fn.name;
  };
} else {
  const replaceComments = require('replace-comments-x');
  const fToString = functionCtr.prototype.toString;
  const normalise = require('normalize-space-x').normalizeSpace2018;
  const reName = /^(?:async )?(?:function|class) ?(?:\* )?([\w$]+)/i;
  const stringMatch = require('cached-constructors-x').String.prototype.match;
  getName = function _getName(fn) {
    let match;
    try {
      match = stringMatch.call(normalise(replaceComments(fToString.call(fn), ' ')), reName);

      if (match) {
        const name = match[1];

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
export default function getFunctionName(fn) {
  return isFunction(fn, true) ? getName(fn) : void 0;
}
