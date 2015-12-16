/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:1, maxdepth:2,
  maxstatements:11, maxcomplexity:3 */

/*global expect, module, require, describe, it, returnExports */

(function () {
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

  describe('Basic tests', function () {
    it('should return `undefined` for everything', function () {
      var values = [true, 'abc', 1, null, undefined, new Date(), [], /r/],
          expected = values.map(function () {}),
          actual = values.map(getFunctionName);
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
            /*jshint evil:true */
            new Function()
          ],
          expected = [
            'Object',
            'String',
            'Boolean',
            'Number',
            'Array',
            'Function',
            '',
            'test',
            ''
          ],
          actual = values.map(getFunctionName);
      expect(actual).toEqual(expected);
    });
  });
}());
