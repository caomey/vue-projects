# js的内置对象有哪些

## **arguments 函数参数的集合**

arguments[ ] 函数参数的数组
Arguments 一个函数的参数和其他属性
Arguments.callee 当前正在运行的函数
Arguments.length 传递给函数的参数的个数

## Array 数组

length 属性 动态获取数组长度
join() 将一个数组转成字符串。返回一个字符串。
reverse() 将数组中各元素颠倒顺序
delete 运算符 只能删除数组元素的值，而**所占空间还在**，总长度没变(arr.length)。
shift() 删除数组中第一个元素，返回删除的那个值，并将长度减 1。
pop() 删除数组中最后一个元素，返回删除的那个值，并将长度减 1。
unshift() 往数组前面添加一个或多个数组元素，长度要改变。arrObj.unshift(“a” ，“b，“c”)
push() 往数组结尾添加一个或多个数组元素，长度要改变。arrObj.push( “a” ，“b”，“c”)
concat( ) 连接数组,返回一个新数组,**原数组不变**
slice(start,end ) 返回数组的一部分,左闭右开,原数组不变
sort( ) 对数组元素进行排序, 可以传入一个**排序函数**
splice( ) 插入、删除或替换数组的元素

```js
arrayObject.splice(index,num,[...newArr])
```

toLocaleString( ) 把数组转换成局部字符串
toString( ) 将数组转换成一个字符串

```js
1.当数字是四位数及以上时，有区别
2.当目标是标准时间格式时，用以上两种方法是有区别的
```

map() 高阶函数

```js
var arr = [1, "a", "2", "b"];

console.log(arr.length);
console.log(arr.join());
console.log(delete arr[0], arr);
console.log(arr.length);
console.log(arr.reverse());
console.log(arr.shift(), arr);
console.log(arr.pop(), arr);
console.log(arr.unshift(1), arr);
console.log(arr.push(3), arr);
console.log(arr.concat([4, 4]), arr);
console.log(arr.slice(1, 3), arr);
console.log(
  arr.sort((i, j) => {// i,j为相邻的元素
    return i - j; //j-i为逆序,可以使更复杂的排序函数
  })
);
console.log(arr.splice(1, 0, "x", "y"), arr);
//第二个参数为0,表示插入,不为0,表示替换,只有2个参数表示删除,!!!比较全能

output:
4
1,a,2,b
true [ <1 empty item>, 'a', '2', 'b' ]
4
[ 'b', '2', 'a', <1 empty item> ]
b [ '2', 'a', <1 empty item> ]
undefined [ '2', 'a' ]
3 [ 1, '2', 'a' ]
4 [ 1, '2', 'a', 3 ]
[ 1, '2', 'a', 3, 4, 4 ] [ 1, '2', 'a', 3 ]
[ '2', 'a' ] [ 1, '2', 'a', 3 ]
[ 3, '2', 1, 'a' ]
[] [ 3, 'x', 'y', '2', 1, 'a' ]
```



## Boolean 布尔对象

Boolean.toString( ) 将布尔值转换成字符串
Boolean.valueOf( ) Boolean 对象的布尔值

```js
var a = new Boolean();
console.log(a);
console.log(a.toString());
console.log(a.valueOf());

out:
[Boolean: false]
false
false
```



## **Date 日期时间**

创建 Date 对象的方法
（1）创建当前(现在)日期对象的实例，不带任何参数

var today = new Date()；
（2）创建指定时间戳的日期对象实例，参数是时间戳。
时间戳：是指某一个时间距离 1970 年 1 月 1 日 0 时 0 分 0 秒，过去了多少毫秒值(1 秒
=1000 毫秒)。
var timer = new Date(10000)； //时间是 1970 年 1 月 1 日 0 时 0 分 10 秒
（3）指定一个字符串的日期时间信息，参数是一个日期时间字符串
var timer = new Date(“2015/5/25 10：00：00”)；
（4）指定多个数值参数
var timer = new Date(2015+100，4，25，10，20，0)； //顺序为：年、月、日、
时、分、秒，年、月、日是必须的。
**方法：**
Date.getDate( ) 返回一个月中的某一天
Date.getDay( ) 返回一周中的某一天
Date.getFullYear( ) 返回 Date 对象的年份字段
Date.getHours( ) 返回 Date 对象的小时字段
Date.getMilliseconds( ) 返回 Date 对象的毫秒字段
Date.getMinutes( ) 返回 Date 对象的分钟字段
Date.getMonth( ) 返回 Date 对象的月份字段
Date.getSeconds( ) 返回 Date 对象的秒字段
Date.getTime( ) 返回 Date 对象的毫秒表示
Date.getTimezoneOffset( ) 判断与 GMT 的时间差
Date.getUTCDate( ) 返回该天是一个月的哪一天(世界时)
Date.getUTCDay( ) 返回该天是星期几(世界时)
Date.getUTCFullYear( ) 返回年份(世界时)
Date.getUTCHours( ) 返回 Date 对象的小时字段(世界时)
Date.getUTCMilliseconds( ) 返回 Date 对象的毫秒字段(世界时)
Date.getUTCMinutes( ) 返回 Date 对象的分钟字段(世界时)
Date.getUTCMonth( ) 返回 Date 对象的月份(世界时)
Date.getUTCSeconds( ) 返回 Date 对象的秒字段(世界时)
Date.getYear( ) 返回 Date 对象的年份字段(世界时)
Date.parse( ) 解析日期/时间字符串
Date.setDate( ) 设置一个月的某一天
Date.setFullYear( ) 设置年份，也可以设置月份和天
Date.setHours( ) 设置 Date 对象的小时字段、分钟字段、秒字段和毫秒字段
Date.setMilliseconds( ) 设置 Date 对象的毫秒字段
Date.setMinutes( ) 设置 Date 对象的分钟字段和秒字段
Date.setMonth( ) 设置 Date 对象的月份字段和天字段
Date.setSeconds( ) 设置 Date 对象的秒字段和毫秒字段
Date.setTime( ) 以毫秒设置 Date 对象
Date.setUTCDate( ) 设置一个月中的某一天(世界时)
Date.setUTCFullYear( ) 设置年份、月份和天(世界时)
Date.setUTCHours( ) 设置 Date 对象的小时字段、分钟字段、秒字段和毫秒字段(世界时)
Date.setUTCMilliseconds( ) 设置 Date 对象的毫秒字段(世界时)
Date.setUTCMinutes( ) 设置 Date 对象的分钟字段和秒字段(世界时)
Date.setUTCMonth( ) 设置 Date 对象的月份字段和天数字段(世界时)
Date.setUTCSeconds( ) 设置 Date 对象的秒字段和毫秒字段(世界时)
Date.setYear( ) 设置 Date 对象的年份字段
Date.toDateString( ) 返回 Date 对象日期部分作为字符串
**Date.toGMTString( )** 将 Date 转换为世界时字符串
Date.toLocaleDateString( ) 回 Date 对象的日期部分作为本地已格式化的字符串
Date.toLocaleString( ) 将 Date 转换为本地已格式化的字符串
Date.toLocaleTimeString( ) 返回 Date 对象的时间部分作为本地已格式化的字符串
Date.toString( ) 将 Date 转换为字符串
Date.toTimeString( ) 返回 Date 对象日期部分作为字符串
Date.toUTCString( ) 将 Date 转换为字符串(世界时)
Date.UTC( ) 将 Date 规范转换成毫秒数
Date.valueOf( ) 将 Date 转换成毫秒表示

## **Error 异常对象**

**Error.message** 可以读取的错误消息
Error.name 错误的类型
Error.toString( ) 把 Error 对象转换成字符串
EvalError 在不正确使用 eval()时抛出
SyntaxError 抛出该错误用来通知语法错误
RangeError 在数字超出合法范围时抛出
ReferenceError 在读取不存在的变量时抛出
TypeError 当一个值的类型错误时，抛出该异常
URIError 由 URl 的编码和解码方法抛出

```js
var err = new Error(TypeError("类型错误"));
console.log(err.message);
console.log(err.name);
console.log(err.toString());
out:
TypeError: 类型错误
Error
Error: TypeError: 类型错误
```



## **Function 函数构造器**

Function.apply( ) 将函数作为一个对象的方法调用
Function.arguments[] 传递给函数的参数
Function.call( ) 将函数作为对象的方法调用
Function.caller 调用当前函数的函数
Function.length 已声明的参数的个数
Function.prototype 对象类的原型
Function.toString( ) 把函数转换成字符串

```js
function Fn(name, age) {
  this.name = name;
  this.age = age;
}
Fn.prototype.info = 111;
var obj = {};

Fn.apply(obj, ["张三", 18]);
console.log(obj);
Fn.call(obj, "张三", 18);
console.log(obj);
console.log(Fn.length);
console.log(Fn.prototype);
console.log(Fn.toString());

out:
{ name: '张三', age: 18 }
{ name: '张三', age: 18 }
2
Fn { info: 111 }
function Fn(name, age) {
  this.name = name;
  this.age = age;
}
```



## **Math 数学对象**

Math 对象是一个静态对象
Math.PI 圆周率。
**Math.abs() 绝对值。**
Math.ceil() 向上取整(整数加 1，小数去掉)。
Math.floor() 向下取整(直接去掉小数)。
**Math.round() 四舍五入。**
Math.pow(x，y) 求 x 的 y 次方。
Math.sqrt() 求平方根。

## **Number 数值对象**

Number.MAX_VALUE 最大数值
Number.MIN_VALUE 最小数值
Number.NaN 特殊的非数字值
Number.NEGATIVE_INFINITY 负无穷大
Number.POSITIVE_INFINITY 正无穷大
Number.toExponential( ) 用指数计数法格式化数字
Number.toFixed( ) 采用定点计数法格式化数字
Number.toLocaleString( ) 把数字转换成本地格式的字符串
Number.toPrecision( ) 格式化数字的有效位
Number.toString( ) 将—个数字转换成字符串
Number.valueOf( ) 返回原始数值

## **Object 基础对象**

Object 含有所有 JavaScript 对象的特性的超类
**Object.constructor** 对象的构造函数
Object.hasOwnProperty( ) 检查属性是否被继承
Object.isPrototypeOf( ) 一个对象是否是另一个对象的原型
Object.propertyIsEnumerable( ) 是否可以通过 for/in 循环看到属性
Object.toLocaleString( ) 返回对象的本地字符串表示
Object.toString( ) 定义一个对象的字符串表示
Object.valueOf( ) 指定对象的原始值
**Object.assign()**将被拷贝对象的自有属性 *浅拷贝*至目标对象中。

**Object.keys(obj)** 查看对象的属性和方法

```js
Object.assign(targetObj, copyObj_1, ....,copyObj_n );
var a = {
  a: 1,
};

var b = {
  a: 2,
  b: 3,
};

Object.assign(a, b);
console.log(a); //{ a: 2, b: 3 }
```

## Object.prototype.tpString.call() 

在`JavaScript`里使用`typeof`判断数据类型，只能区分**基本类型**，即：`number`、`string`、`undefined`、`boolean`、`object`。
对于`null`、`array`、`function`、`object`来说，使用`typeof`都会统一返回`object`字符串。
要想区分对象、数组、函数、单纯使用`typeof`是不行的。在JS中，可以通过`Object.prototype.toString`方法，判断某个对象之属于哪种内置类型。
分为`null`、`string`、`boolean`、`number`、`undefined`、`array`、`function`、`object`、`date`、`math`。

```js
var a = 1234
Object.prototype.tpString.call(a).indexof(Number) > -1 //判断数据类型,返回8为对应数据类型
var a = new Number(1234)
a instanceof Number  // 返回true,判断的类型必须是new出来的对象
```



## **RegExp 正则表达式对象**

RegExp.exec( ) 通用的匹配模式
RegExp.**global** 正则表达式是否全局匹配 -g
RegExp.**ignoreCase** 正则表达式是否区分大小写 -i
RegExp.lastIndex 下次匹配的起始位置
RegExp.source 正则表达式的文本
RegExp.test( ) 检测一个字符串是否匹配某个模式
RegExp.toString( ) 把正则表达式转换成字符串

## **String 字符串对象**

Length 获取字符串的长度。如：var len = strObj.length
toLowerCase() 将字符串中的字母转成全小写。如：strObj.toLowerCase()
toUpperCase() 将字符串中的字母转成全大写。如：strObj.toUpperCase()
charAt(index) 返回指定下标位置的一个字符。如果没有找到，则返回空字符串。
substring(start,end) 在原始字符串，返回一个子字符串。
substr(start,num) 在原始字符串，返回一个子字符串
区别：'''
“abcdefgh”.substring(2，3) = “c”
“abcdefgh”.substr(2，3) = “cde”
'''
split() 将一个字符串转成数组。
charCodeAt( ) 返回字符串中的第 n 个字符的代码
concat( ) 连接字符串
fromCharCode( ) 从字符编码创建—个字符串
indexOf( ) 返回一个子字符串在原始字符串中的索引值(查找顺序从左往右查找)。如果没
有找到，则返回-1。
lastIndexOf( ) 从后向前检索一个字符串
**localeCompare( ) 用本地特定的顺序来比较两个字符串**

```js
let a = '啊'
let b = '哦'
a.localCompare(b,'zh')
```

match( ) 找到一个或多个正则表达式的匹配
replace( ) 替换一个与正则表达式匹配的子串
search( ) 检索与正则表达式相匹配的子串
slice( ) 抽取一个子串
toLocaleLowerCase( ) 把字符串转换小写
toLocaleUpperCase( ) 将字符串转换成大写
toString( ) 返回字符串
valueOf( ) 返回字符串

```JS
var s = "test12";
console.log(s.length);  // 6
console.log(s.toUpperCase()); // TEST12
console.log(s.toLowerCase()); // test12
console.log(s.substring(2, 3)); // s
console.log(s.substr(2, 3)); // st1
console.log(s.split(""));	//[ 't', 'e', 's', 't', '1', '2' ]
console.log(s.slice(2, 3)); // s
console.log(s.concat("3")); // test123
console.log(s.indexOf("1")); // 4
console.log(s.charAt(1)); // e
console.log(s.charCodeAt(1)); //101 
console.log(s.replace(1, 2)); // test22

```

## formData

```js
const formData = new FormData();
formData.append("name", "tom");
```



## 获取对象的原型方法

```js
function getFnNames(obj){ 
    if(!obj) return;
    //打印对象(本身和原型链上)所有函数的名字，包括不可枚举的
    Object.getOwnPropertyNames(obj).forEach((key,index)=>{
        let type = Object.prototype.toString.call(obj[key]);
        if(type!=='[object Function]') return;
        let str = obj[key].toString();
        let result = str.match(/\(.*\)/);
        console.log(key+result[0]);
    });
}
 
let arr = new Array();
 
getFnNames(arr.__proto__);
```



