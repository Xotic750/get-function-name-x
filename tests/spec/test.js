/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:1, maxdepth:2,
  maxstatements:11, maxcomplexity:3 */

/*global JSON:true, expect, module, require, describe, it, returnExports */

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
            new Function(),
            /*jshint evil:false */
            function test1(){},
            function test2 (){},
            function test3( ) { },
            function test4 ( ) { },
            function/*foo*/test5(){},
            function/*foo*/test6/*bar*/(){},
            function/*foo*/test7/*bar*/(/*baz*/){},
            /*fum*/function/*foo*/ // blah
            test8/*bar*/ // wizz
            (/*baz*/
             ){},
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
            '',
            'test1',
            'test2',
            'test3',
            'test4',
            'test5',
            'test6',
            'test7',
            'test8'
          ],
          actual = values.map(getFunctionName);
      expect(actual).toEqual(expected);

      var fat;
      try {
        /*jshint evil:true */
        fat = eval('(0,() => {return this})');
        expect(getFunctionName(fat)).toBe('');
      } catch (ignore) {}

      var gen;
      try {
        /*jshint evil:true */
        gen = eval('(0,function* idMaker(){})');
        expect(getFunctionName(gen)).toBe('idMaker');
      } catch (ignore) {}
    });
  });
}());
