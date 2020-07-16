# ES6

ESMAscripts6

## ES6和javascript的关系

ES6 是一个js的规范，对js的一系列扩展，js是对ES6的实现

## var let const 的关系

1. let不存在变量提升
   1. var 存在变量提升， let不存在变量提升
   2. var存在预解析，var变量提升，后声明不报错
   3. let没有预解析，必须提前声明
2. let同一作用域下不能重复定义同一个名称
   1. var是**函数作用域**（function())，let 是**块级作用域**（{}内为一个块）
3. 严格的作用域（重新声明时)
   1. 全局定义的var，全局访问，函数内定义的var，函数内的块内也能访问，函数内定义的var函数外不能访问
   2.  函数内的let 和 函数内块内的let 定义同一个变量名，互不影响

### const

1. 声明一个只读的常量，不能修改
2. 必须初始化 ，不能只声明不赋值 （const a 不赋值会报错） 
3. 声明的是对象的话，指向对象的地址不能变更，想当是引用，但是可以修改
   1. 例如， const obj = {}； obj.name = 'lisa'
   2. const arr = [];  a.push(1)

## 箭头函数

简化了函数的定义 , 变量名 = 参数 => 返回值（函数体）

```js
// 定义函数
var f = function(v){
return v;
}
// 箭头函数
var f = v => v;
// 无参数箭头函数
var f = () => v;
// 多参数箭头函数
var f = (n1, n2) => n1+n2
```

## ...扩展运算符

```js
var arr = [1,2,2,2,3]
var arr2 = [...new Set(arr)];
```

## 数据结构

### set

唯一成员

```js
const s = new Set();
s.add(1).add(2).add(2);// 链式编程
```



### map

```js
const m = new Map();
// 添加
m.set('name', 'lisa').set('age', 18);
// 遍历
for(let [key, value] of m){    
}
```



