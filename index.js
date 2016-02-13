/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/get-function-name-x"
 * title="Travis status">
 * <img
 * src="https://travis-ci.org/Xotic750/get-function-name-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/get-function-name-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/get-function-name-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/get-function-name-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/get-function-name-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/get-function-name-x" title="npm version">
 * <img src="https://badge.fury.io/js/get-function-name-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * getFunctionName module. Returns the name of the function.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.10
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module get-function-name-x
 */

/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:1, maxdepth:2,
  maxstatements:13, maxcomplexity:4 */

/*global module */

;(function () {
  'use strict';

  var isFunction = require('is-function-x');
  var getFnName;

  if ((function test() {}).name !== 'test') {
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    var fToString = Function.prototype.toString;
    var pMatch = String.prototype.match;
    var pReplace = String.prototype.replace;
    var s = require('white-space-x').ws;
    var reName = new RegExp(
      '^[' + s + ']*(?:function|class)[' + s + ']*\\*?[' + s + ']+([\\w\\$]+)[' + s + ']*',
      'i'
    );
    getFnName = function getName(fn) {
      var name = pMatch.call(
        pReplace.call(fToString.call(fn), STRIP_COMMENTS, ' '),
        reName
      );
      return name && name[1] !== 'anonymous' ? name[1] : '';
    };
  } else {
    /*jshint evil:true */
    if ((new Function()).name === 'anonymous') {
      getFnName = function getName(fn) {
        return fn.name && fn.name !== 'anonymous' ? fn.name : '';
      };
    }
  }
  /**
   * This method returns the name of the function, or `undefined` if not
   * a function.
   *
   * @param {Function} fn The function to get the name of.
   * @return {undefined|string} The name of the function,  or `undefined` if
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
    if (!isFunction(fn)) {
      return;
    }
    return getFnName ? getFnName(fn) : fn.name;
  };
}());
