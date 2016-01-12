(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.returnExports = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
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
 * @version 1.0.4
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
  maxstatements:9, maxcomplexity:4 */

/*global module */

;(function () {
  'use strict';

  var ES = _dereq_('es-abstract/es6'),
    s = _dereq_('white-space-x')(false, s),
    pFunctionToString, pMatch, reName, getFnName;

  if ((function test() {}).name !== 'test') {
    pFunctionToString = Function.prototype.toString;
    pMatch = String.prototype.match;
    reName = [
      new RegExp(
        '^[' + s + ']*function[' + s + ']*\\*?[' + s + ']+([\\w\\$]+)[' + s + ']*\\(',
        'i'
      )
    ];
    getFnName = function getName(fn) {
      var name = ES.Call(pMatch, ES.Call(pFunctionToString, fn), reName);
      if (name) {
        name = name[1];
      }
      return name && name !== 'anonymous' ? name : '';
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
   * getFunctionName(function test() {}); // 'test'
   */
  module.exports = function getFunctionName(fn) {
    if (!ES.IsCallable(fn)) {
      return;
    }
    return getFnName ? getFnName(fn) : fn.name;
  };
}());

},{"es-abstract/es6":5,"white-space-x":24}],2:[function(_dereq_,module,exports){
'use strict';

var keys = _dereq_('object-keys');
var foreach = _dereq_('foreach');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

var toStr = Object.prototype.toString;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
        /* eslint-disable no-unused-vars, no-restricted-syntax */
        for (var _ in obj) { return false; }
        /* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		Object.defineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = props.concat(Object.getOwnPropertySymbols(map));
	}
	foreach(props, function (name) {
		defineProperty(object, name, map[name], predicates[name]);
	});
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;

},{"foreach":15,"object-keys":21}],3:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/define-property-x"
 * title="Travis status">
 * <img src="https://travis-ci.org/Xotic750/define-property-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/define-property-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/define-property-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/define-property-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/define-property-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/define-property-x" title="npm version">
 * <img src="https://badge.fury.io/js/define-property-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * A helper for
 * {@link https://www.npmjs.com/package/define-properties `define-properties`}.
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
 * @version 1.0.7
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module define-property-x
 */

/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:4, maxdepth:1,
  maxstatements:6, maxcomplexity:2 */

/*global module */

;(function () {
  'use strict';

  var defineProps = _dereq_('define-properties');

  /**
   * Predicate that always returns `true` (constant).
   *
   * @private
   * @return {boolean} Returns `true`.
   */
  function truePredicate() {
    return true;
  }

  /**
   * Just like `define-properties` but for defining a single non-enumerable
   * property. Useful in environments that do not support
   * `Computed property names`. This can be done with `define-properties`, but
   * this method can read a little cleaner.
   *
   * @see https://www.npmjs.com/package/define-properties
   * @param {Object} object The object on which to define the property.
   * @param {string|Symbol} property The property name.
   * @param {*} value The value of the property.
   * @param {boolean} [force=false] If `true` then set property regardless.
   * @example
   * var defineProps = require('define-properties');
   * var defineProp = require('define-property-x');
   * var myString = 'something';
   * var obj = defineProps({
   *   a: 1,
   *   b: 2
   *   [Symbol.iterator]: function () {}, // This is not yet widely supported.
   *   [myString]: true // This is not yet widely supported.
   * }, {
   *   a: function () { return false; },
   *   b: function () { return true; }
   *   [Symbol.iterator]: function () { return true; }, // This is not yet
   *                                                    // widely supported.
   *   [myString]: function () { return true; } // This is not yet widely
   *                                            // supported.
   * });
   *
   * // But you can do this.
   * defineProp(obj, Symbol.iterator, function () {}, true);
   * defineProp(obj, myString, function () {}, true);
   */
  module.exports = function defineProperty(object, property, value, force) {
    var prop = {},
      predicate = {};
    prop[property] = value;
    if (force) {
      predicate[property] = truePredicate;
    }
    defineProps(object, prop, predicate);
  };
}());

},{"define-properties":2}],4:[function(_dereq_,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };
var $isFinite = _dereq_('./helpers/isFinite');

var sign = _dereq_('./helpers/sign');
var mod = _dereq_('./helpers/mod');

var IsCallable = _dereq_('is-callable');
var toPrimitive = _dereq_('es-to-primitive/es5');

// https://es5.github.io/#x9
var ES5 = {
	ToPrimitive: toPrimitive,

	ToBoolean: function ToBoolean(value) {
		return Boolean(value);
	},
	ToNumber: function ToNumber(value) {
		return Number(value);
	},
	ToInteger: function ToInteger(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number)) { return 0; }
		if (number === 0 || !$isFinite(number)) { return number; }
		return sign(number) * Math.floor(Math.abs(number));
	},
	ToInt32: function ToInt32(x) {
		return this.ToNumber(x) >> 0;
	},
	ToUint32: function ToUint32(x) {
		return this.ToNumber(x) >>> 0;
	},
	ToUint16: function ToUint16(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x10000);
	},
	ToString: function ToString(value) {
		return String(value);
	},
	ToObject: function ToObject(value) {
		this.CheckObjectCoercible(value);
		return Object(value);
	},
	CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
		/* jshint eqnull:true */
		if (value == null) {
			throw new TypeError(optMessage || 'Cannot call method on ' + value);
		}
		return value;
	},
	IsCallable: IsCallable,
	SameValue: function SameValue(x, y) {
		if (x === y) { // 0 === -0, but they are not identical.
			if (x === 0) { return 1 / x === 1 / y; }
			return true;
		}
        return $isNaN(x) && $isNaN(y);
	}
};

module.exports = ES5;

},{"./helpers/isFinite":8,"./helpers/mod":10,"./helpers/sign":11,"es-to-primitive/es5":12,"is-callable":17}],5:[function(_dereq_,module,exports){
'use strict';

var toStr = Object.prototype.toString;
var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';
var symbolToStr = hasSymbols ? Symbol.prototype.toString : toStr;

var $isNaN = Number.isNaN || function (a) { return a !== a; };
var $isFinite = _dereq_('./helpers/isFinite');
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;

var assign = _dereq_('./helpers/assign');
var sign = _dereq_('./helpers/sign');
var mod = _dereq_('./helpers/mod');
var isPrimitive = _dereq_('./helpers/isPrimitive');
var toPrimitive = _dereq_('es-to-primitive/es6');
var parseInteger = parseInt;
var bind = _dereq_('function-bind');
var strSlice = bind.call(Function.call, String.prototype.slice);
var isBinary = bind.call(Function.call, RegExp.prototype.test, /^0b[01]+$/i);
var isOctal = bind.call(Function.call, RegExp.prototype.test, /^0o[0-7]+$/i);
var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
var nonWSregex = new RegExp('[' + nonWS + ']', 'g');
var hasNonWS = bind.call(Function.call, RegExp.prototype.test, nonWSregex);
var invalidHexLiteral = /^[\-\+]0x[0-9a-f]+$/i;
var isInvalidHexLiteral = bind.call(Function.call, RegExp.prototype.test, invalidHexLiteral);

// whitespace from: http://es5.github.io/#x15.5.4.20
// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
var ws = [
	'\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
	'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
	'\u2029\uFEFF'
].join('');
var trimRegex = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
var replace = bind.call(Function.call, String.prototype.replace);
var trim = function (value) {
	return replace(value, trimRegex, '');
};

var ES5 = _dereq_('./es5');

var hasRegExpMatcher = _dereq_('is-regex');

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-abstract-operations
var ES6 = assign(assign({}, ES5), {

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-call-f-v-args
	Call: function Call(F, V) {
		var args = arguments.length > 2 ? arguments[2] : [];
		if (!this.IsCallable(F)) {
			throw new TypeError(F + ' is not a function');
		}
		return F.apply(V, args);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toprimitive
	ToPrimitive: toPrimitive,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toboolean
	// ToBoolean: ES5.ToBoolean,

	// http://www.ecma-international.org/ecma-262/6.0/#sec-tonumber
	ToNumber: function ToNumber(argument) {
		var value = isPrimitive(argument) ? argument : toPrimitive(argument, 'number');
		if (typeof value === 'symbol') {
			throw new TypeError('Cannot convert a Symbol value to a number');
		}
		if (typeof value === 'string') {
			if (isBinary(value)) {
				return this.ToNumber(parseInteger(strSlice(value, 2), 2));
			} else if (isOctal(value)) {
				return this.ToNumber(parseInteger(strSlice(value, 2), 8));
			} else if (hasNonWS(value) || isInvalidHexLiteral(value)) {
				return NaN;
			} else {
				var trimmed = trim(value);
				if (trimmed !== value) {
					return this.ToNumber(trimmed);
				}
			}
		}
		return Number(value);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tointeger
	// ToInteger: ES5.ToNumber,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint32
	// ToInt32: ES5.ToInt32,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint32
	// ToUint32: ES5.ToUint32,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint16
	ToInt16: function ToInt16(argument) {
		var int16bit = this.ToUint16(argument);
		return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint16
	// ToUint16: ES5.ToUint16,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint8
	ToInt8: function ToInt8(argument) {
		var int8bit = this.ToUint8(argument);
		return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8
	ToUint8: function ToUint8(argument) {
		var number = this.ToNumber(argument);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x100);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8clamp
	ToUint8Clamp: function ToUint8Clamp(argument) {
		var number = this.ToNumber(argument);
		if ($isNaN(number) || number <= 0) { return 0; }
		if (number >= 0xFF) { return 0xFF; }
		var f = Math.floor(argument);
		if (f + 0.5 < number) { return f + 1; }
		if (number < f + 0.5) { return f; }
		if (f % 2 !== 0) { return f + 1; }
		return f;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tostring
	ToString: function ToString(argument) {
		if (typeof argument === 'symbol') {
			throw new TypeError('Cannot convert a Symbol value to a string');
		}
		return String(argument);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toobject
	ToObject: function ToObject(value) {
		this.RequireObjectCoercible(value);
		return Object(value);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
	ToPropertyKey: function ToPropertyKey(argument) {
		var key = this.ToPrimitive(argument, String);
		return typeof key === 'symbol' ? symbolToStr.call(key) : this.ToString(key);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	ToLength: function ToLength(argument) {
		var len = this.ToInteger(argument);
		if (len <= 0) { return 0; } // includes converting -0 to +0
		if (len > MAX_SAFE_INTEGER) { return MAX_SAFE_INTEGER; }
		return len;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-canonicalnumericindexstring
	CanonicalNumericIndexString: function CanonicalNumericIndexString(argument) {
		if (toStr.call(argument) !== '[object String]') {
			throw new TypeError('must be a string');
		}
		if (argument === '-0') { return -0; }
		var n = this.ToNumber(argument);
		if (this.SameValue(this.ToString(n), argument)) { return n; }
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-requireobjectcoercible
	RequireObjectCoercible: ES5.CheckObjectCoercible,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray
	IsArray: Array.isArray || function IsArray(argument) {
		return toStr.call(argument) === '[object Array]';
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-iscallable
	// IsCallable: ES5.IsCallable,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
	IsConstructor: function IsConstructor(argument) {
		return this.IsCallable(argument); // unfortunately there's no way to truly check this without try/catch `new argument`
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isextensible-o
	IsExtensible: function IsExtensible(obj) {
		if (!Object.preventExtensions) { return true; }
		if (isPrimitive(obj)) {
			return false;
		}
		return Object.isExtensible(obj);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isinteger
	IsInteger: function IsInteger(argument) {
		if (typeof argument !== 'number' || $isNaN(argument) || !$isFinite(argument)) {
			return false;
		}
		var abs = Math.abs(argument);
		return Math.floor(abs) === abs;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ispropertykey
	IsPropertyKey: function IsPropertyKey(argument) {
		return typeof argument === 'string' || typeof argument === 'symbol';
	},

	// http://www.ecma-international.org/ecma-262/6.0/#sec-isregexp
	IsRegExp: function IsRegExp(argument) {
		if (!argument || typeof argument !== 'object') {
			return false;
		}
		if (hasSymbols) {
			var isRegExp = RegExp[Symbol.match];
			if (typeof isRegExp !== 'undefined') {
				return ES5.ToBoolean(isRegExp);
			}
		}
		return hasRegExpMatcher(argument);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevalue
	// SameValue: ES5.SameValue,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero
	SameValueZero: function SameValueZero(x, y) {
		return (x === y) || ($isNaN(x) && $isNaN(y));
	}
});

delete ES6.CheckObjectCoercible; // renamed in ES6 to RequireObjectCoercible

module.exports = ES6;

},{"./es5":4,"./helpers/assign":7,"./helpers/isFinite":8,"./helpers/isPrimitive":9,"./helpers/mod":10,"./helpers/sign":11,"es-to-primitive/es6":13,"function-bind":16,"is-regex":19}],6:[function(_dereq_,module,exports){
'use strict';

var ES6 = _dereq_('./es6');
var assign = _dereq_('./helpers/assign');

var ES7 = assign(ES6, {
	// https://github.com/tc39/ecma262/pull/60
	SameValueNonNumber: function SameValueNonNumber(x, y) {
		if (typeof x === 'number' || typeof x !== typeof y) {
			throw new TypeError('SameValueNonNumber requires two non-number values of the same type.');
		}
		return this.SameValue(x, y);
	}
});

module.exports = ES7;

},{"./es6":5,"./helpers/assign":7}],7:[function(_dereq_,module,exports){
var has = Object.prototype.hasOwnProperty;
module.exports = Object.assign || function assign(target, source) {
	for (var key in source) {
		if (has.call(source, key)) {
			target[key] = source[key];
		}
	}
	return target;
};

},{}],8:[function(_dereq_,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],9:[function(_dereq_,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],10:[function(_dereq_,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],11:[function(_dereq_,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],12:[function(_dereq_,module,exports){
'use strict';

var toStr = Object.prototype.toString;

var isPrimitive = _dereq_('./helpers/isPrimitive');

var isCallable = _dereq_('is-callable');

// https://es5.github.io/#x8.12
var ES5internalSlots = {
	'[[DefaultValue]]': function (O, hint) {
		var actualHint = hint || (toStr.call(O) === '[object Date]' ? String : Number);

		if (actualHint === String || actualHint === Number) {
			var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
			var value, i;
			for (i = 0; i < methods.length; ++i) {
				if (isCallable(O[methods[i]])) {
					value = O[methods[i]]();
					if (isPrimitive(value)) {
						return value;
					}
				}
			}
			throw new TypeError('No default value');
		}
		throw new TypeError('invalid [[DefaultValue]] hint supplied');
	}
};

// https://es5.github.io/#x9
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	return ES5internalSlots['[[DefaultValue]]'](input, PreferredType);
};

},{"./helpers/isPrimitive":14,"is-callable":17}],13:[function(_dereq_,module,exports){
'use strict';

var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';

var isPrimitive = _dereq_('./helpers/isPrimitive');
var isCallable = _dereq_('is-callable');
var isDate = _dereq_('is-date-object');
var isSymbol = _dereq_('is-symbol');

var ordinaryToPrimitive = function OrdinaryToPrimitive(O, hint) {
	if (typeof O === 'undefined' || O === null) {
		throw new TypeError('Cannot call method on ' + O);
	}
	if (typeof hint !== 'string' || (hint !== 'number' && hint !== 'string')) {
		throw new TypeError('hint must be "string" or "number"');
	}
	var methodNames = hint === 'string' ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
	var method, result, i;
	for (i = 0; i < methodNames.length; ++i) {
		method = O[methodNames[i]];
		if (isCallable(method)) {
			result = method.call(O);
			if (isPrimitive(result)) {
				return result;
			}
		}
	}
	throw new TypeError('No default value');
};

var GetMethod = function GetMethod(O, P) {
	var func = O[P];
	if (func !== null && typeof func !== 'undefined') {
		if (!isCallable(func)) {
			throw new TypeError(func + ' returned for property ' + P + ' of object ' + O + ' is not a function');
		}
		return func;
	}
};

// http://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	var hint = 'default';
	if (arguments.length > 1) {
		if (PreferredType === String) {
			hint = 'string';
		} else if (PreferredType === Number) {
			hint = 'number';
		}
	}

	var exoticToPrim;
	if (hasSymbols) {
		if (Symbol.toPrimitive) {
			exoticToPrim = GetMethod(input, Symbol.toPrimitive);
		} else if (isSymbol(input)) {
			exoticToPrim = Symbol.prototype.valueOf;
		}
	}
	if (typeof exoticToPrim !== 'undefined') {
		var result = exoticToPrim.call(input, hint);
		if (isPrimitive(result)) {
			return result;
		}
		throw new TypeError('unable to convert exotic object to primitive');
	}
	if (hint === 'default' && (isDate(input) || isSymbol(input))) {
		hint = 'string';
	}
	return ordinaryToPrimitive(input, hint === 'default' ? 'number' : hint);
};

},{"./helpers/isPrimitive":14,"is-callable":17,"is-date-object":18,"is-symbol":20}],14:[function(_dereq_,module,exports){
arguments[4][9][0].apply(exports,arguments)
},{"dup":9}],15:[function(_dereq_,module,exports){

var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};


},{}],16:[function(_dereq_,module,exports){
var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    var bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


},{}],17:[function(_dereq_,module,exports){
'use strict';

var constructorRegex = /\s*class /;
var isNonES6ClassFn = function isNonES6ClassFn(value) {
	try {
		return !constructorRegex.test(value);
	} catch (e) {
		return false; // not a function
	}
};

var fnToStr = Function.prototype.toString;
var tryFunctionObject = function tryFunctionObject(value) {
	try {
		if (constructorRegex.test(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (!isNonES6ClassFn(value)) { return false; }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};

},{}],18:[function(_dereq_,module,exports){
'use strict';

var getDay = Date.prototype.getDay;
var tryDateObject = function tryDateObject(value) {
	try {
		getDay.call(value);
		return true;
	} catch (e) {
		return false;
	}
};

var toStr = Object.prototype.toString;
var dateClass = '[object Date]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isDateObject(value) {
	if (typeof value !== 'object' || value === null) { return false; }
	return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
};

},{}],19:[function(_dereq_,module,exports){
'use strict';

var regexExec = RegExp.prototype.exec;
var tryRegexExec = function tryRegexExec(value) {
	try {
		regexExec.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var regexClass = '[object RegExp]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isRegex(value) {
	if (typeof value !== 'object') { return false; }
	return hasToStringTag ? tryRegexExec(value) : toStr.call(value) === regexClass;
};

},{}],20:[function(_dereq_,module,exports){
'use strict';

var toStr = Object.prototype.toString;
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

if (hasSymbols) {
	var symToStr = Symbol.prototype.toString;
	var symStringRegex = /^Symbol\(.*\)$/;
	var isSymbolObject = function isSymbolObject(value) {
		if (typeof value.valueOf() !== 'symbol') { return false; }
		return symStringRegex.test(symToStr.call(value));
	};
	module.exports = function isSymbol(value) {
		if (typeof value === 'symbol') { return true; }
		if (toStr.call(value) !== '[object Symbol]') { return false; }
		try {
			return isSymbolObject(value);
		} catch (e) {
			return false;
		}
	};
} else {
	module.exports = function isSymbol(value) {
		// this environment does not support Symbols.
		return false;
	};
}

},{}],21:[function(_dereq_,module,exports){
'use strict';

// modified from https://github.com/es-shims/es5-shim
var has = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var slice = Array.prototype.slice;
var isArgs = _dereq_('./isArguments');
var hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString');
var hasProtoEnumBug = function () {}.propertyIsEnumerable('prototype');
var dontEnums = [
	'toString',
	'toLocaleString',
	'valueOf',
	'hasOwnProperty',
	'isPrototypeOf',
	'propertyIsEnumerable',
	'constructor'
];
var equalsConstructorPrototype = function (o) {
	var ctor = o.constructor;
	return ctor && ctor.prototype === o;
};
var blacklistedKeys = {
	$console: true,
	$frame: true,
	$frameElement: true,
	$frames: true,
	$parent: true,
	$self: true,
	$webkitIndexedDB: true,
	$webkitStorageInfo: true,
	$window: true
};
var hasAutomationEqualityBug = (function () {
	/* global window */
	if (typeof window === 'undefined') { return false; }
	for (var k in window) {
		try {
			if (!blacklistedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
				try {
					equalsConstructorPrototype(window[k]);
				} catch (e) {
					return true;
				}
			}
		} catch (e) {
			return true;
		}
	}
	return false;
}());
var equalsConstructorPrototypeIfNotBuggy = function (o) {
	/* global window */
	if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
		return equalsConstructorPrototype(o);
	}
	try {
		return equalsConstructorPrototype(o);
	} catch (e) {
		return false;
	}
};

var keysShim = function keys(object) {
	var isObject = object !== null && typeof object === 'object';
	var isFunction = toStr.call(object) === '[object Function]';
	var isArguments = isArgs(object);
	var isString = isObject && toStr.call(object) === '[object String]';
	var theKeys = [];

	if (!isObject && !isFunction && !isArguments) {
		throw new TypeError('Object.keys called on a non-object');
	}

	var skipProto = hasProtoEnumBug && isFunction;
	if (isString && object.length > 0 && !has.call(object, 0)) {
		for (var i = 0; i < object.length; ++i) {
			theKeys.push(String(i));
		}
	}

	if (isArguments && object.length > 0) {
		for (var j = 0; j < object.length; ++j) {
			theKeys.push(String(j));
		}
	} else {
		for (var name in object) {
			if (!(skipProto && name === 'prototype') && has.call(object, name)) {
				theKeys.push(String(name));
			}
		}
	}

	if (hasDontEnumBug) {
		var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

		for (var k = 0; k < dontEnums.length; ++k) {
			if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
				theKeys.push(dontEnums[k]);
			}
		}
	}
	return theKeys;
};

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			return (Object.keys(arguments) || '').length === 2;
		}(1, 2));
		if (!keysWorksWithArguments) {
			var originalKeys = Object.keys;
			Object.keys = function keys(object) {
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				} else {
					return originalKeys(object);
				}
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;

},{"./isArguments":22}],22:[function(_dereq_,module,exports){
'use strict';

var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

},{}],23:[function(_dereq_,module,exports){
'use strict';

var define = _dereq_('define-properties');
var ES = _dereq_('es-abstract/es7');
var bind = _dereq_('function-bind');
var replace = bind.call(Function.call, String.prototype.replace);
var syntaxChars = /[\^\$\\\.\*\+\?\(\)\[\]\{\}\|]/g;

var escapeShim = function escape(S) {
	return replace(ES.ToString(S), syntaxChars, '\\$&');
};

define(escapeShim, {
	method: escapeShim,
	shim: function shimRegExpEscape() {
		define(RegExp, {
			escape: escapeShim
		});
		return RegExp.escape;
	}
});

module.exports = escapeShim;

},{"define-properties":2,"es-abstract/es7":6,"function-bind":16}],24:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/white-space-x"
 * title="Travis status">
 * <img src="https://travis-ci.org/Xotic750/white-space-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/white-space-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/white-space-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a href="https://david-dm.org/Xotic750/white-space-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/white-space-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/white-space-x" title="npm version">
 * <img src="https://badge.fury.io/js/white-space-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * whitespace module.
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
 * @version 1.0.2
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module white-space-x
 */

/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:2, maxdepth:2,
  maxstatements:6, maxcomplexity:4 */

/*global module */

;(function () {
  'use strict';

  var defProp = _dereq_('define-property-x'),
    escapeRx = _dereq_('regexp.escape'),
    whiteSpaces = [
      0x0009, // Tab
      0x000a, // Line Feed
      0x000b, // Vertical Tab
      0x000c, // Form Feed
      0x000d, // Carriage Return
      0x0020, // Space
      //0x0085, // Next line - Not ES5 whitespace
      0x00a0, // No-break space
      0x1680, // Ogham space mark
      0x180e, // Mongolian vowel separator
      0x2000, // En quad
      0x2001, // Em quad
      0x2002, // En space
      0x2003, // Em space
      0x2004, // Three-per-em space
      0x2005, // Four-per-em space
      0x2006, // Six-per-em space
      0x2007, // Figure space
      0x2008, // Punctuation space
      0x2009, // Thin space
      0x200a, // Hair space
      //0x200b, // Zero width space - Not ES5 whitespace
      0x2028, // Line separator
      0x2029, // Paragraph separator
      0x202f, // Narrow no-break space
      0x205f, // Medium mathematical space
      0x3000, // Ideographic space
      0xfeff // Byte Order Mark
    ],
    c = {
      s: whiteSpaces.reduce(function (acc, item) {
          return acc + String.fromCharCode(item);
        }, ''),

      w: (function () {
        var count = 65536,
          str = '';
        do {
          count -= 1;
          if (whiteSpaces.indexOf(count) < 0) {
            str = String.fromCharCode(count) + str;
          }
        } while (count);
        return str;
      }())
    };

  c.se = (c.s + c.w).replace(/\s/g, '') !== c.w ? escapeRx(c.s) : '\\s';
  c.we = (c.s + c.w).replace(/\w/g, '') !== c.s ? escapeRx(c.w) : '\\w';

  /**
   * Generate a string of ES5 (non-)whitespaces, optionally escaped for use
   * with `new RegExp`.
   *
   * @param {boolean} [nonWhiteSpace=false] Generate a string of
   * non-whitespaces.
   * @param {boolean} [escaped=false] Generate an escaped string.
   * @return {string} The generated string.
   * @example
   * var generateString = require('white-space-x');
   * var ws = generateString();
   * var nonWs = generateString(true);
   *
   * var re1 = new RegExp('^[' + generateString(false, true) + ']+$)');
   * re1.test(ws); // true
   *
   * var re2 = new RegExp('[' + generateString(false, true) + ']$)');
   * re2.test(nonWs); // false
   */
  module.exports = function generateString(nonWhiteSpace, escaped) {
    if (nonWhiteSpace === true) {
      return escaped === true ? c.we : c.w;
    }
    return escaped === true ? c.se : c.s;
  };

  /**
   * An array of the whitespace char codes.
   *
   * @name whiteSpaces
   * @type Array.<number>
   * @property {number} 0 0x0009 // Tab
   * @property {number} 1 0x000a // Line Feed
   * @property {number} 2 0x000b // Vertical Tab
   * @property {number} 3 0x000c // Form Feed
   * @property {number} 4 0x000d // Carriage Return
   * @property {number} 5 0x0020 // Space
   * @property {number} 6 0x00a0 // No-break space
   * @property {number} 7 0x1680 // Ogham space mark
   * @property {number} 8 0x180e // Mongolian vowel separator
   * @property {number} 9 0x2000 // En quad
   * @property {number} 10 0x2001 // Em quad
   * @property {number} 11 0x2002 // En space
   * @property {number} 12 0x2003 // Em space
   * @property {number} 13 0x2004 // Three-per-em space
   * @property {number} 14 0x2005 // Four-per-em space
   * @property {number} 15 0x2006 // Six-per-em space
   * @property {number} 16 0x2007 // Figure space
   * @property {number} 17 0x2008 // Punctuation space
   * @property {number} 18 0x2009 // Thin space
   * @property {number} 19 0x200a // Hair space
   * @property {number} 20 0x2028 // Line separator
   * @property {number} 21 0x2029 // Paragraph separator
   * @property {number} 22 0x202f // Narrow no-break space
   * @property {number} 23 0x205f // Medium mathematical space
   * @property {number} 24 0x3000 // Ideographic space
   * @property {number} 25 0xfeff // Byte Order Mark
   */
  defProp(module.exports, 'whiteSpaces', whiteSpaces);

  /**
   * This method takes a string and puts a backslash in front of every
   * character that is part of the regular expression syntax. This is useful
   * if you have a run-time string that you need to match in some text and the
   * string may contain special regex characters.
   *
   * @function escape
   * @param {string} string The string to be escaped.
   * @return {string} The escaped string.
   */
  defProp(module.exports, 'escape', escapeRx);
}());

},{"define-property-x":3,"regexp.escape":23}]},{},[1])(1)
});