(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.returnExports = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
 * @file Get the name of the function.
 * @version 2.0.0
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
  isFunctionLike = _dereq_('is-function-x');
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
  var s = _dereq_('white-space-x').string;
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

},{"is-function-x":5,"white-space-x":11}],2:[function(_dereq_,module,exports){
var isFunction = _dereq_('is-function')

module.exports = forEach

var toString = Object.prototype.toString
var hasOwnProperty = Object.prototype.hasOwnProperty

function forEach(list, iterator, context) {
    if (!isFunction(iterator)) {
        throw new TypeError('iterator must be a function')
    }

    if (arguments.length < 3) {
        context = this
    }
    
    if (toString.call(list) === '[object Array]')
        forEachArray(list, iterator, context)
    else if (typeof list === 'string')
        forEachString(list, iterator, context)
    else
        forEachObject(list, iterator, context)
}

function forEachArray(array, iterator, context) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            iterator.call(context, array[i], i, array)
        }
    }
}

function forEachString(string, iterator, context) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        iterator.call(context, string.charAt(i), i, string)
    }
}

function forEachObject(object, iterator, context) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            iterator.call(context, object[k], k, object)
        }
    }
}

},{"is-function":6}],3:[function(_dereq_,module,exports){
/**
 * @file Tests if ES6 Symbol is supported.
 * @version 1.4.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module has-symbol-support-x
 */

'use strict';

/**
 * Indicates if `Symbol`exists and creates the correct type.
 * `true`, if it exists and creates the correct type, otherwise `false`.
 *
 * @type boolean
 */
module.exports = typeof Symbol === 'function' && typeof Symbol('') === 'symbol';

},{}],4:[function(_dereq_,module,exports){
/**
 * @file Tests if ES6 @@toStringTag is supported.
 * @see {@link http://www.ecma-international.org/ecma-262/6.0/#sec-@@tostringtag|26.3.1 @@toStringTag}
 * @version 1.4.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module has-to-string-tag-x
 */

'use strict';

/**
 * Indicates if `Symbol.toStringTag`exists and is the correct type.
 * `true`, if it exists and is the correct type, otherwise `false`.
 *
 * @type boolean
 */
module.exports = _dereq_('has-symbol-support-x') && typeof Symbol.toStringTag === 'symbol';

},{"has-symbol-support-x":3}],5:[function(_dereq_,module,exports){
/**
 * @file Determine whether a given value is a function object.
 * @version 1.4.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-function-x
 */

'use strict';

var fToString = Function.prototype.toString;
var toStringTag = _dereq_('to-string-tag-x');
var hasToStringTag = _dereq_('has-to-string-tag-x');
var isPrimitive = _dereq_('is-primitive');
var funcTag = '[object Function]';
var genTag = '[object GeneratorFunction]';
var asyncTag = '[object AsyncFunction]';

var constructorRegex = /^\s*class /;
var isES6ClassFn = function isES6ClassFunc(value) {
  try {
    var fnStr = fToString.call(value);
    var singleStripped = fnStr.replace(/\/\/.*\n/g, '');
    var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, '');
    var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' ');
    return constructorRegex.test(spaceStripped);
  } catch (ignore) {}

  return false; // not a function
};

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @private
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 * else `false`.
 */
var tryFuncToString = function funcToString(value) {
  try {
    if (isES6ClassFn(value)) {
      return false;
    }

    fToString.call(value);
    return true;
  } catch (ignore) {}

  return false;
};

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 * else `false`.
 * @example
 * var isFunction = require('is-function-x');
 *
 * isFunction(); // false
 * isFunction(Number.MIN_VALUE); // false
 * isFunction('abc'); // false
 * isFunction(true); // false
 * isFunction({ name: 'abc' }); // false
 * isFunction(function () {}); // true
 * isFunction(new Function ()); // true
 * isFunction(function* test1() {}); // true
 * isFunction(function test2(a, b) {}); // true
 - isFunction(async function test3() {}); // true
 * isFunction(class Test {}); // false
 * isFunction((x, y) => {return this;}); // true
 */
module.exports = function isFunction(value) {
  if (isPrimitive(value)) {
    return false;
  }

  if (hasToStringTag) {
    return tryFuncToString(value);
  }

  if (isES6ClassFn(value)) {
    return false;
  }

  var strTag = toStringTag(value);
  return strTag === funcTag || strTag === genTag || strTag === asyncTag;
};

},{"has-to-string-tag-x":4,"is-primitive":7,"to-string-tag-x":9}],6:[function(_dereq_,module,exports){
module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};

},{}],7:[function(_dereq_,module,exports){
/*!
 * is-primitive <https://github.com/jonschlinkert/is-primitive>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

// see http://jsperf.com/testing-value-is-primitive/7
module.exports = function isPrimitive(value) {
  return value == null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],8:[function(_dereq_,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is `null`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
 * @example
 *
 * _.isNull(null);
 * // => true
 *
 * _.isNull(void 0);
 * // => false
 */
function isNull(value) {
  return value === null;
}

module.exports = isNull;

},{}],9:[function(_dereq_,module,exports){
/**
 * @file Get an object's ES6 @@toStringTag.
 * @see {@link http://www.ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring|19.1.3.6 Object.prototype.toString ( )}
 * @version 1.4.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module to-string-tag-x
 */

'use strict';

var isNull = _dereq_('lodash.isnull');
var isUndefined = _dereq_('validate.io-undefined');
var toStr = Object.prototype.toString;

/**
 * The `toStringTag` method returns "[object type]", where type is the
 * object type.
 *
 * @param {*} value - The object of which to get the object type string.
 * @returns {string} The object type string.
 * @example
 * var toStringTag = require('to-string-tag-x');
 *
 * var o = new Object();
 * toStringTag(o); // returns '[object Object]'
 */
module.exports = function toStringTag(value) {
  if (isNull(value)) {
    return '[object Null]';
  }

  if (isUndefined(value)) {
    return '[object Undefined]';
  }

  return toStr.call(value);
};

},{"lodash.isnull":8,"validate.io-undefined":10}],10:[function(_dereq_,module,exports){
/**
*
*	VALIDATE: undefined
*
*
*	DESCRIPTION:
*		- Validates if a value is undefined.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

/**
* FUNCTION: isUndefined( value )
*	Validates if a value is undefined.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating whether value is undefined
*/
function isUndefined( value ) {
	return value === void 0;
} // end FUNCTION isUndefined()


// EXPORTS //

module.exports = isUndefined;

},{}],11:[function(_dereq_,module,exports){
/**
 * @file List of ECMAScript5 white space characters.
 * @version 2.0.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module white-space-x
 */

'use strict';

var forEach = _dereq_('for-each');

/**
 * An array of the ES5 whitespace char codes, string, and their descriptions.
 *
 * @name list
 * @type Array.<Object>
 * @example
 * var whiteSpace = require('white-space-x');
 * whiteSpaces.list.foreach(function (item) {
 *   console.log(lib.description, item.code, item.string);
 * });
 */
var list = [
  {
    code: 0x0009,
    description: 'Tab',
    string: '\u0009'
  },
  {
    code: 0x000a,
    description: 'Line Feed',
    string: '\u000a'
  },
  {
    code: 0x000b,
    description: 'Vertical Tab',
    string: '\u000b'
  },
  {
    code: 0x000c,
    description: 'Form Feed',
    string: '\u000c'
  },
  {
    code: 0x000d,
    description: 'Carriage Return',
    string: '\u000d'
  },
  {
    code: 0x0020,
    description: 'Space',
    string: '\u0020'
  },
  /*
  {
    code: 0x0085,
    description: 'Next line - Not ES5 whitespace',
    string: '\u0085'
  }
  */
  {
    code: 0x00a0,
    description: 'No-break space',
    string: '\u00a0'
  },
  {
    code: 0x1680,
    description: 'Ogham space mark',
    string: '\u1680'
  },
  {
    code: 0x180e,
    description: 'Mongolian vowel separator',
    string: '\u180e'
  },
  {
    code: 0x2000,
    description: 'En quad',
    string: '\u2000'
  },
  {
    code: 0x2001,
    description: 'Em quad',
    string: '\u2001'
  },
  {
    code: 0x2002,
    description: 'En space',
    string: '\u2002'
  },
  {
    code: 0x2003,
    description: 'Em space',
    string: '\u2003'
  },
  {
    code: 0x2004,
    description: 'Three-per-em space',
    string: '\u2004'
  },
  {
    code: 0x2005,
    description: 'Four-per-em space',
    string: '\u2005'
  },
  {
    code: 0x2006,
    description: 'Six-per-em space',
    string: '\u2006'
  },
  {
    code: 0x2007,
    description: 'Figure space',
    string: '\u2007'
  },
  {
    code: 0x2008,
    description: 'Punctuation space',
    string: '\u2008'
  },
  {
    code: 0x2009,
    description: 'Thin space',
    string: '\u2009'
  },
  {
    code: 0x200a,
    description: 'Hair space',
    string: '\u200a'
  },
  /*
  {
    code: 0x200b,
    description: 'Zero width space - Not ES5 whitespace',
    string: '\u200b'
  },
  */
  {
    code: 0x2028,
    description: 'Line separator',
    string: '\u2028'
  },
  {
    code: 0x2029,
    description: 'Paragraph separator',
    string: '\u2029'
  },
  {
    code: 0x202f,
    description: 'Narrow no-break space',
    string: '\u202f'
  },
  {
    code: 0x205f,
    description: 'Medium mathematical space',
    string: '\u205f'
  },
  {
    code: 0x3000,
    description: 'Ideographic space',
    string: '\u3000'
  },
  {
    code: 0xfeff,
    description: 'Byte Order Mark',
    string: '\ufeff'
  }
];

var string = '';
forEach(list, function reducer(item) {
  string += item.string;
});

/**
 * A string of the ES5 whitespace characters.
 *
 * @name string
 * @type string
 * @example
 * var whiteSpace = require('white-space-x');
 * var characters = [
 *   '\u0009',
 *   '\u000a',
 *   '\u000b',
 *   '\u000c',
 *   '\u000d',
 *   '\u0020',
 *   '\u00a0',
 *   '\u1680',
 *   '\u180e',
 *   '\u2000',
 *   '\u2001',
 *   '\u2002',
 *   '\u2003',
 *   '\u2004',
 *   '\u2005',
 *   '\u2006',
 *   '\u2007',
 *   '\u2008',
 *   '\u2009',
 *   '\u200a',
 *   '\u2028',
 *   '\u2029',
 *   '\u202f',
 *   '\u205f',
 *   '\u3000',
 *   '\ufeff'
 * ];
 * var ws = characters.join('');
 * var re1 = new RegExp('^[' + whiteSpace.string + ']+$)');
 * re1.test(ws); // true
 */
module.exports = {
  list: list,
  string: string
};

},{"for-each":2}]},{},[1])(1)
});