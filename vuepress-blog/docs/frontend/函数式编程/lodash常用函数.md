# lodash 常用函数

[官网](https://www.lodashjs.com/)

[函数式编程指南](http://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)

## lodash安装

```js
npm i lodash -S
```

## 引入lodash

```js
import _ from "lodash"
//或者
var _ = require('lodash')
```

## 常用函数

### 深拷贝cloneDeep

```js
_.cloneDeep(obj)
```
### 获取对象的值get

```js
_.get(obj,'a.b',[]) //第三个值,没有时返回的默认值
```

### 判断属性是否存在has

```js
_.has(obj,'a.b')
```
### 柯里化curry

```js
var abc = function(a, b, c) {
  return [a, b, c];
};
 
var curried = _.curry(abc);
 
curried(1)(2)(3);
// => [1, 2, 3]
 
curried(1, 2)(3);
// => [1, 2, 3]
 
curried(1, 2, 3);
// => [1, 2, 3]
 
// Curried with placeholders.
curried(1)(_, 3)(2);
// => [1, 2, 3]
```

### flow组合

```js
_.flow([fn...])
```

实现f(x) = (x + 6) / 2 * 3

```js
const add6 =_.curry(_.add)(6)
add6(9) //15
const div2 = _.curryRight(_.divide)(2)
div2(4) // 2
const mult3 = _.curry(_.multiply)(3)
mult3(3) //9
const f = _.flow([add6,div2,mult3])
f(2) //=>12
```

### 类型判断 Lang

_.isString

_.isNumber

_.isArray

_isBoolean

_.isObject

_.isSet

_.isFunction

_.isEmpty

### 遍历对象并保存键 mapValues

```js
_.mapValues(obj,'property')

var users = {
  fred: { user: "fred", age: 40 },
  pebbles: { user: "pebbles", age: 1 },
};
console.log(_.mapValues(users, "age"));
//=>{ 'fred': 40, 'pebbles': 1 }
```

