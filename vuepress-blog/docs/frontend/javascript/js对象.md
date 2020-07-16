# js对象

**JS中，可以将对象分为“内部对象”、“宿主对象”和“自定义对象”三种。**

## 1.内部对象

js中的内部对象包括Array、Boolean、Date、Function、Global、Math、Number、Object、RegExp、String以及各种错误类对象，包括Error、EvalError、RangeError、ReferenceError、SyntaxError和TypeError。其中Global和Math这两个对象又被称为“内置对象”，这两个对象在脚本程序初始化时被创建，不必实例化这两个对象。 

## **2.宿主对象**

宿主对象就是执行JS脚本的环境提供的对象。对于嵌入到网页中的JS来说，其宿主对象就是浏览器提供的对象，所以又称为浏览器对象，如IE、Firefox等浏览器提供的对象。不同的浏览器提供的宿主对象可能不同，即使提供的对象相同，其实现方式也大相径庭！这会带来浏览器兼容问题，增加开发难度。浏览器对象有很多，如**Window和Document**等等。



## **3.自定义对象**

顾名思义，就是开发人员自己定义的对象。JS允许使用自定义对象，使JS应用及功能得到扩充

---

## new一个对象

new 操作符后跟一个构造函数。构造函数可以是JS原生引用类型（比如：Object、Array、Date、Number等），也可以是自定义函数。
比如这样

```js
// 内置对象
var person = new Object();
var colors = new Array();   // 数组也是对象哟
//自定义对象
function Person(age) {
  this.age = age;
  console.log(this)
}
var p1 = new Person(20);
```

## 实现原理

1、创建一个空对象
 2、让空对象的_*proto*_（IE没有该属性）成员指向了构造函数的prototype成员对象
 3、使用apply调用构造器函数，属性和方法被添加到 this 引用的对象中
 4、如果构造函数中没有返回其它对象，那么返回 this，即创建的这个的新对象，否则，返回构造函数中返回的对象
 具体如下：

```js
function _new() {
    let obj= {}; // 创建的新对象
    // 第一个参数是构造函数
    let [constructor, ...args] = [...arguments];
    // 执行 [[原型]] 连接 ;实际上就是生产了一个新的上下文
    obj.__proto__ = constructor.prototype;
    // 使用apply在obj作用域中调用构造器函数，属性和方法被添加到 this 引用的对象即obj中
    let result = constructor.apply(obj, args);
    if (result && (typeof (result) == "object" || typeof (result) == "function")) {
        // 如果构造函数执行的结果返回的是一个对象，那么返回这个对象
        return result;
    }
    // 如果构造函数返回的不是一个对象，返回创建的新对象
    return obj;
}
```

结合下面的代码片段来具体分析下：
代码片段一

```js
function Person(age){
        this.age= age;
        console.log(this);
        return {age:age};//返回对象
    }
    Person.prototype.index = 1
    var person1 = new Person(20);  // 此处相当于var person1=_new(Person, 20)
    var person2 = Person(18); // 没使用new Person相当是个函数
    console.log(person1);
    console.log(person2);
    console.log('p1.index=', person1.index)
    console.log('p2.index=', person2.index)
```

上面 **var person1 = new Person(20)**和**var person1=_new(Person, 20)**效果相当。

- **obj._\*proto\*_ = constructor.prototype**，即 **obj._\*proto\*_ = Person.prototype**，
   将obj的_proto_（隐式原型）指向Person的原型对象，此时obj的原型链为：
   **obj => Person.prototype => Object.prototype => null**
   因此 执行到**let result = constructor.apply(target, args)**这句代码时，在obj作用域中调用Person函数，打印出 **Person {age: 20}**
   因为Person函数返回的是一个对象，所以**console.log(person1)**打印出的就是返回的这个对象：**{age: 20}**，person1.index自然就为undefined

而var person2 = Person(18)，只是简单的调用了Person函数，在window全局中执行，所以打印出Window对象，执行console.log(person2)打印出：**{age: 18}**，person2.index为undefined

代码片段二

```jsx
    function Person(age){
        this.age= age;
        console.log(this);
        // return {age:age};//返回对象
    }
    Person.prototype.index = 1

    var person1 = new Person(20);  // 相当于var person1 = _new (Person, 20);
    var person2 = Person(18); // 没使用new Person相当是个函数
// 该Person函数没返回值,所以person2为undefined
     
    console.log(person1);
    console.log(person2);

    console.log('p1.index=', person1.index)
    console.log('p2.index=', person2.index)// 会报错
```

代码片段二和代码片段一的区别在于， 片段二中构造函数Person没有返回值（返回的不是一个对象，还可以通过直接返回age验证下效果），所以person1接收到的实际上是_new新创建的对象obj，即**Person {age: 20}**, person1.index则相当于obj.index属性时，它会先找自身的index属性，如果找不到，则会顺着原型链向上找，这时会找到People.prototype.index，person1.index的结果是1。
 由于Person没有返回值，所以**console.log(person2)**结果为undefined，进而，打印person2.index时会报错。

## 总结

通过new操作符，我们可以创建原对象的一个**实例对象**，而这个实例对象**继承**了原对象的属性和方法，所以new存在的意义在于它实现了javascript中的继承，而不仅仅是实例化了一个对象



**对象有属性和方法**

```js
var obj = {
  name: "xiaowei",
  age: "27",
  drink: function () {
    console.log("i am drinking");
  },
  eat: function (food) {
    console.log("i am eating" + food);
  },
};

// 增删改查
console.log(obj.name); //查询 或者 obj['name']
obj.age = 28;// 改
obj.sex = 'male'; // 增加属性
delete obj.age; // 删除属性
```

## 对象的创建方法

1. var obj = {}
2. 构造函数
   1. 系统自带的构造函数 var obj = new Object()  // Array() Number()
   2. 自定义 var p1 = new Person()



## 构造函数

和函数的区别，构造函数，遵循大驼峰命名规则

```js
function Car(color) {
  this.name = "BMW";
  this.color = color;
  this.height = "1400";
  this.lang = "4900";
  this.weight = 1000;
  this.heelth = 100;
  this.run = function(){
        this.health --;
    }
}

var car = new Car("red");
var car1 = Car("red"); //调用函数没return值，为undefined
console.log(car); // Car {}
console.log(car1);//undefined
```

## 构造函数内部原理

new之后

1. 在函数体最前面隐式的加上var  this = {}
2. 执行this.xxx = xxx;
3. 隐式的return this

模拟构造函数this

```js
function Person(name, height) {
  var that = {};
  that.name = name;
  that.height = height;
  return that;
}
var person = Person(" xiaowang", 180);
var person1 = Person(" xiaozhang", 175);
console.log(person.name);
```

## 包装类

new String()

```js
var s = 'abc'
console.log(s.length)
// 隐式的调用包装类 new String('abc').length, 然后销毁new String
```

new Boolean()

new Number()

new FormData(), HTML5的FormData对象, FormData对象就是一张虚拟的表单，我们可以在FormData对象中添加一些键值对进去，然后将整个FormData作为表单提交到服务器



## Object对象

`var obj = new Object()`的写法生成新对象，与字面量的写法`var obj = {}`是等价的

Object 的静态方法：

`Object.keys`方法的参数是一个对象，返回一个数组

```js
var obj = {
  p1: 123,
  p2: 456
};
Object.keys(obj) // ["p1", "p2"]
```

**Object.assign()** 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象

Object.assign(target, ...sources)

```js
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }

```

## JS中的Map对象,高阶函数map是小写的

```js
var m = new Map(); // 空Map
m.set('Adam', 67); // 添加新的key-value
m.set('Bob', 59);
m.has('Adam'); // 是否存在key 'Adam': true
m.get('Adam'); // 67
m.delete('Adam'); // 删除key 'Adam'
m.get('Adam'); // undefined
```
题目：判断重复项

```js
function dupicateWord (arr) {
    var result = {}
    arr.map((val) => {
        result[val] = typeof result[val] == 'undefined' ? false : true
    })
    return result
}
```

