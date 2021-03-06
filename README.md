<a
  href="https://travis-ci.org/Xotic750/get-function-name-x"
  title="Travis status">
<img
  src="https://travis-ci.org/Xotic750/get-function-name-x.svg?branch=master"
  alt="Travis status" height="18">
</a>
<a
  href="https://david-dm.org/Xotic750/get-function-name-x"
  title="Dependency status">
<img src="https://david-dm.org/Xotic750/get-function-name-x/status.svg"
  alt="Dependency status" height="18"/>
</a>
<a
  href="https://david-dm.org/Xotic750/get-function-name-x?type=dev"
  title="devDependency status">
<img src="https://david-dm.org/Xotic750/get-function-name-x/dev-status.svg"
  alt="devDependency status" height="18"/>
</a>
<a
  href="https://badge.fury.io/js/get-function-name-x"
  title="npm version">
<img src="https://badge.fury.io/js/get-function-name-x.svg"
  alt="npm version" height="18">
</a>
<a
  href="https://www.jsdelivr.com/package/npm/get-function-name-x"
  title="jsDelivr hits">
<img src="https://data.jsdelivr.com/v1/package/npm/get-function-name-x/badge?style=rounded"
  alt="jsDelivr hits" height="18">
</a>
<a
  href="https://bettercodehub.com/results/Xotic750/get-function-name-x"
  title="bettercodehub score">
<img src="https://bettercodehub.com/edge/badge/Xotic750/get-function-name-x?branch=master"
  alt="bettercodehub score" height="18">
</a>
<a
  href="https://coveralls.io/github/Xotic750/get-function-name-x?branch=master"
  title="Coverage Status">
<img src="https://coveralls.io/repos/github/Xotic750/get-function-name-x/badge.svg?branch=master"
  alt="Coverage Status" height="18">
</a>

<a name="module_get-function-name-x"></a>

## get-function-name-x

Get the name of the function.

<a name="exp_module_get-function-name-x--module.exports"></a>

### `module.exports(fn)` ⇒ <code>undefined</code> \| <code>string</code> ⏏

This method returns the name of the function, or `undefined` if not
a function.

**Kind**: Exported function  
**Returns**: <code>undefined</code> \| <code>string</code> - The name of the function, or `undefined` if
not a function.

| Param | Type                  | Description                      |
| ----- | --------------------- | -------------------------------- |
| fn    | <code>function</code> | The function to get the name of. |

**Example**

```js
import getFunctionName from 'get-function-name-x';

console.log(getFunctionName()); // undefined
console.log(getFunctionName(Number.MIN_VALUE)); // undefined
console.log(getFunctionName('abc')); // undefined
console.log(getFunctionName(true)); // undefined
console.log(getFunctionName({name: 'abc'})); // undefined
console.log(getFunctionName(function() {})); // ''
console.log(getFunctionName(new Function())); // ''
console.log(getFunctionName(function test1() {})); // 'test1'
console.log(getFunctionName(function* test2() {})); // 'test2'
console.log(getFunctionName(class Test {});) // 'Test'
```
