let getFunctionName;

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

const getFat = function getFatFunc() {
  try {
    // eslint-disable-next-line no-new-func
    return new Function('return () => {return this;};')();
  } catch (ignore) {
    // empty
  }

  return false;
};

const ifSupportsFatit = getFat() ? it : xit;

const getGF = function getGeneratoFunc() {
  try {
    // eslint-disable-next-line no-new-func
    return new Function('return function* idMaker(){};')();
  } catch (ignore) {
    // empty
  }

  return false;
};

const ifSupportsGFit = getGF() ? it : xit;

const getC = function getClassFunc() {
  try {
    // eslint-disable-next-line no-new-func
    return new Function('"use strict"; return class My {};')();
  } catch (ignore) {
    // empty
  }

  return false;
};

const ifSupportsCit = getC() ? it : xit;

const getAF = function getAsyncFunc() {
  try {
    // eslint-disable-next-line no-new-func
    return new Function('return async function wait() {}')();
  } catch (ignore) {
    // empty
  }

  return false;
};

const ifSupportsAFit = getAF() ? it : xit;

describe('basic tests', function() {
  it('should return `undefined` for everything', function() {
    expect.assertions(1);
    expect.assertions(1);
    const values = [true, 'abc', 1, null, undefined, new Date(), [], /r/];

    const cb = function() {};

    const expected = values.map(cb);
    const actual = values.map(getFunctionName);
    expect(actual).toStrictEqual(expected);
  });

  it('should return a correct string for everything', function() {
    expect.assertions(1);
    expect.assertions(1);
    const values = [
      Object,
      String,
      Boolean,
      Number,
      Array,
      Function,
      function() {},
      function test() {},
      // eslint-disable-next-line no-new-func
      new Function(),
      function test1() {},
      function test2() {},
      function test3() {},
      function test4() {},
      function /* foo */ test5() {},
      function /* foo */ test6 /* bar */() {},
      function /* foo */ test7 /* bar */(/* baz */) {},
      /* fum */ function /* foo */ // blah
      test8 /* baz */() {},
    ];

    const expected = [
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
      'test8',
    ];

    const actual = values.map(getFunctionName);
    expect(actual).toStrictEqual(expected);
  });

  ifSupportsFatit('should return a correct string for everything', function() {
    expect.assertions(1);
    expect.assertions(1);
    const fat = getFat();
    expect(getFunctionName(fat)).toBe('');
  });

  ifSupportsGFit('should return a correct string for everything', function() {
    expect.assertions(1);
    expect.assertions(1);
    const gen = getGF();
    expect(getFunctionName(gen)).toBe('idMaker');
  });

  ifSupportsAFit('should return a correct string for everything', function() {
    expect.assertions(1);
    expect.assertions(1);
    const classes = getAF();
    expect(getFunctionName(classes)).toBe('wait');
  });

  ifSupportsCit('should return a correct string for everything', function() {
    expect.assertions(1);
    expect.assertions(1);
    const classes = getC();
    expect(getFunctionName(classes)).toBe('My');
  });
});
