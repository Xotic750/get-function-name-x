<a href="https://travis-ci.org/Xotic750/get-function-name-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/get-function-name-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/get-function-name-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/get-function-name-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/get-function-name-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/get-function-name-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/get-function-name-x" title="npm version">
<img src="https://badge.fury.io/js/get-function-name-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_get-function-name-x"></a>

## get-function-name-x
Get the name of the function.

**Version**: 2.0.5  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_get-function-name-x--module.exports"></a>

### `module.exports(fn)` ⇒ <code>undefined</code> \| <code>string</code> ⏏
This method returns the name of the function, or `undefined` if not
a function.

**Kind**: Exported function  
**Returns**: <code>undefined</code> \| <code>string</code> - The name of the function,  or `undefined` if
 not a function.  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The function to get the name of. |

**Example**  
```js
var getFunctionName = require('get-function-name-x');

getFunctionName(); // undefined
getFunctionName(Number.MIN_VALUE); // undefined
getFunctionName('abc'); // undefined
getFunctionName(true); // undefined
getFunctionName({ name: 'abc' }); // undefined
getFunctionName(function () {}); // ''
getFunctionName(new Function ()); // ''
getFunctionName(function test1() {}); // 'test1'
getFunctionName(function* test2() {}); // 'test2'
getFunctionName(class Test {}); // 'Test'
```
