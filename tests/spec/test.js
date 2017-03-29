/* eslint strict: 1, max-lines: 1, symbol-description: 1, max-nested-callbacks: 1,
   max-statements: 1, no-new-func: 1 */

/* global JSON:true, expect, module, require, describe, it, xit, returnExports */

;(function () { // eslint-disable-line no-extra-semi

  'use strict';

  var getFunctionName;
  if (typeof module === 'object' && module.exports) {
    require('es5-shim');
    require('es5-shim/es5-sham');
    if (typeof JSON === 'undefined') {
      JSON = {};
    }
    require('json3').runInContext(null, JSON);
    require('es6-shim');
    getFunctionName = require('../../index.js');
  } else {
    getFunctionName = returnExports;
  }

  var getFat = function getFatFunc() {
    try {
      return new Function('return () => {return this;};')();
    } catch (ignore) {}
    return false;
  };

  var ifSupportsFatit = getFat() ? it : xit;

  var getGF = function getGeneratoFunc() {
    try {
      return new Function('return function* idMaker(){};')();
    } catch (ignore) {}
    return false;
  };

  var ifSupportsGFit = getGF() ? it : xit;

  var getC = function getClassFunc() {
    try {
      return new Function('"use strict"; return class My {};')();
    } catch (ignore) {}
    return false;
  };

  var ifSupportsCit = getC() ? it : xit;

  var getAF = function getAsyncFunc() {
    try {
      return new Function('return async function wait() {}')();
    } catch (ignore) {}
    return false;
  };

  var ifSupportsAFit = getAF() ? it : xit;

  describe('Basic tests', function () {
    it('should return `undefined` for everything', function () {
      var values = [true, 'abc', 1, null, undefined, new Date(), [], /r/];
      var cb = function () {};
      var expected = values.map(cb);
      var actual = values.map(getFunctionName);
      expect(actual).toEqual(expected);
    });

    it('should return a correct string for everything', function () {
      var values = [
        Object,
        String,
        Boolean,
        Number,
        Array,
        Function,
        function () {},
        function test() {},
        new Function(),
        function test1() {},
        function test2() {},
        function test3() { },
        function test4() { },
        function/* foo*/test5() {},
        function/* foo*/test6/* bar*/() {},
        function/* foo*/test7/* bar*/(/* baz*/) {},
        /* fum*/function/* foo*/ // blah
            test8(/* baz*/
             ) {}
      ];
      var expected = [
        'Object',
        'String',
        'Boolean',
        'Number',
        'Array',
        'Function',
        '',
        'test',
        '',
        'test1',
        'test2',
        'test3',
        'test4',
        'test5',
        'test6',
        'test7',
        'test8'
      ];
      var actual = values.map(getFunctionName);
      expect(actual).toEqual(expected);
    });

    ifSupportsFatit('should return a correct string for everything', function () {
      var fat = getFat();
      expect(getFunctionName(fat)).toBe('');
    });

    ifSupportsGFit('should return a correct string for everything', function () {
      var gen = getGF();
      expect(getFunctionName(gen)).toBe('idMaker');
    });

    ifSupportsAFit('should return a correct string for everything', function () {
      var classes = getAF();
      expect(getFunctionName(classes)).toBe('wait');
    });

    ifSupportsCit('should return a correct string for everything', function () {
      var classes = getC();
      expect(getFunctionName(classes)).toBe('My');
    });
  });
}());
