# Class

JavaScript语言中，生成实例对象的传统方法是通过构造函数。

由于这种语法与c++，java相差有点大，故ES6引入了

class这个语法糖。

class的功能在ES5中大部分都能做到

新的class写法让对象原型的写法更加清晰，更像面向对象的编程。

编程语法如下：

```js
class pointer{
    constructor(x,y){
      this.x = x;
      this.y = y;
    }
    toString(){
      return '(' '+ this.x + ',' + this.y)';
}
}
```



定义class的语法时，不需要加function，方法之间也不需要逗号隔开。

定义一个类，它的本质就是一个函数，类本身就指向一个构造函数.

事实上，类的所有方法都定义在类的prototype属性上。

在类的实例上调用方法，实际上是调用原型上的方法。

由于类的方法都在prototype对象上，所以类的新方法可以添加到这个对象上，

使用object.assign()方法可以快速向一个类添加多个新方法。

```js
class Ponit{
  constructor(){
  }
}
Object.assign(Point.prototype,{
  tovalue(){
  }
})
```



类内部定义的所有方法都是不可枚举的，类外部定义的方法就是可枚举的。

```js
var Point = function (x, y) {
 // ...
};
Point.prototype.toString = function() {
 // ...
};
Object.keys(Point.prototype)
// ["toString"]
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"] 
 //Object.getOwnPropertyNames()方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。
```



类的属性名，可以采取表达式。

```js
let methodName = 'getArea';
class Square {
 constructor(length) {
  // ...
 }
 [methodName]() {
  // ...
 }
}
```

严格模式

类和模块内部，默认就是严格模式

方法

constructor()

与JAVA等语言很像，每一个类都必须有一个构造方法（即constructor）

如果没有显式定义，则会生成一个默认构造函数。

constructor()方法默认返回实例对象（this），但是也可以指定返回另外一个对象。

```js
class Foo {
 constructor() {
  return Object.create(null);
 }
}
new Foo() instanceof Foo
// false
```



instanceof运算符用来判断一个构造函数的prototype属性所指向的对象是否存在另外一个要检测对象的原型链上。

类必须要new调用，这是与普通构造函数的区别。

类的实例对象

类的属性除非是显式定义在其本身上（即this对象上），否则都定义在原型上。

与ES5一样，类的所有实例公用一个原型对象。

```js
var p1 = new Point(2,3);
var p2 = new Point(3,2);
p1.__proto__ === p2.__proto__
//true
```



2、hasOwnProperty 

上面代码中，p1和p2都是Point的实例，它们的原型都是Point.prototype，所以__proto__属性是相等的。

这也意味着，可以通过实例的__proto__属性为“类”添加方法。

__proto__ 并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。生产环境中，我们可以使用 Object.getPrototypeOf 方法来获取实例对象的原型，然后再来为原型添加方法/属性。

```js
var p1 = new Point(2,3);
var p2 = new Point(3,2);
p1.__proto__.printName = function () { return 'Oops' };
p1.printName() // "Oops"
p2.printName() // "Oops"
var p3 = new Point(4,2);
p3.printName() // "Oops"
```



上面代码在p1的原型上添加了一个printName方法，由于p1的原型就是p2的原型，因此p2也可以调用这个方法。而且，此后新建的实例p3也可以调用这个方法。这意味着，使用实例的__proto__属性改写原型，必须相当谨慎，不推荐使用，因为这会改变“类”的原始定义，影响到所有实例。

hasOwnProperty判断一个对象是否有名称的属性或对象，此方法无法检查该对象的原型链中是否具有该属性，该属性必须是对象本身的一个成员。 

如果该属性或者方法是该 对象自身定义的而不是器原型链中定义的 则返回true;否则返回false; 

class也可以写成一个表达式：

```js
const MyClass = class Me {
 getClassName() {
  return Me.name;
 }
};
```



上面代码使用表达式定义了一个类。需要注意的是，这个类的名字是MyClass而不是Me，Me只在 Class 的内部代码可用，指代当前类。

```js
let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined
```



上面代码表示，Me只在 Class 内部有定义。

变量提升

ES6的类与ES5不同，它不存在变量提升。

不存在变量提升的原因与下文的继承有关。

私有方法

ES6目前还不提供私有方法。

但有三种变通的方式可以实现私有方法：

1.一种做法是在命名上加以区别。

```js
class Widget {
 // 公有方法
 foo (baz) {
  this._bar(baz);
 }
 // 私有方法
 _bar(baz) {
  return this.snaf = baz;
 }
 // ...
}
```



上面代码中，_bar方法前面的下划线，表示这是一个只限于内部使用的私有方法。但是，这种命名是不保险的，在类的外部，还是可以调用到这个方法。

另一种方法就是索性将私有方法移出模块，因为模块内部的所有方法都是对外可见的。

```js
class Widget {
 foo (baz) {
  bar.call(this, baz);
 }
 // ...
}
function bar(baz) {
 return this.snaf = baz;
}
```



上面代码中，foo是公有方法，内部调用了bar.call(this, baz)。这使得bar实际上成为了当前模块的私有方法。

还有一种方法是利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值。



```js
const bar = Symbol('bar');
const snaf = Symbol('snaf');
export default class myClass{
 // 公有方法
foo(baz) {
  this[bar](baz);
 }
 // 私有方法
 [bar](baz) {
  return this[snaf] = baz;
 }
 // ...
};
```



上面代码中，bar和snaf都是Symbol值，导致第三方无法获取到它们，因此达到了私有方法和私有属性的效果。？？？？

---

# 总结

class

```js
class HotelBooking {
  constructor(name) {
    this.WELCOME = "欢迎光临";  //私有属性
    this.HOTEL_NAME = name;		// 传入属性
    this.init();			//初始化
  }
  init() {
    console.log(this.WELCOME + this.HOTEL_NAME); //使用私有属性
  }
  equiry(room_num) {  //传入参数
    console.log("room " + room_num + " price has been told"); //使用参入参数
  }
  confirm(room_num) {
    console.log("room " + room_num + " has been comfirmed");
  }
  cancel(room_num) {
    console.log("room " + room_num + " booking has been canceled");
  }
}

HotelBooking.prototype.closed = function () { //原型上扩展方法
  console.log("酒店已打样");
};

var booking = new HotelBooking("富豪酒店");
console.log(booking.equiry(2));
console.log(booking.confirm(2));
console.log(booking.cancel(2));
console.log(booking.closed());

out:
欢迎光临富豪酒店
room 2 price has been told
room 2 has been comfirmed
room 2 booking has been canceled
酒店已打样

```

