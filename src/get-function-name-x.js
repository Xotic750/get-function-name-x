import isFunction from 'is-function-x';
import replaceComments from 'replace-comments-x';
import normalise from 'normalize-space-x';

const functionCtr = isFunction.constructor;

let $getName;

/* eslint-disable-next-line lodash/prefer-noop */
const t = function test1() {};

if (t.name === 'test1') {
  const createsAnonymous = functionCtr().name === 'anonymous';
  $getName = function getName(fn) {
    return createsAnonymous && fn.name === 'anonymous' ? '' : fn.name;
  };
} else {
  const fToString = functionCtr.toString;
  const reName = /^(?:async )?(?:function|class) ?(?:\* )?([\w$]+)/i;
  const stringMatch = ''.match;
  $getName = function getName(fn) {
    let match;
    try {
      match = stringMatch.call(normalise(replaceComments(fToString.call(fn), ' ')), reName);

      if (match) {
        const name = match[1];

        return name === 'anonymous' ? '' : name;
      }
    } catch (ignore) {
      // empty
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
 */
const getFunctionName = function getFunctionName(fn) {
  /* eslint-disable-next-line no-void */
  return isFunction(fn, true) ? $getName(fn) : void 0;
};

export default getFunctionName;
