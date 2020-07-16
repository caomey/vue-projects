# call / apply/bind

## 作用

**改变this指向**

## 区别

**后面传参形式不同**

- call   的参数是直接放进去的，第二第三第 n 个参数全都用逗号分隔
- apply  的所有参数都必须放在一个数组里面传进去
- bind 返回是函数

## call

第一个参数是this指向的对象，之后的为传入的实参

不传参数 fun() 和fun.call()没有区别

```js
function Person(name, height) {
  this.name = name;
  this.height = height;
}

var person = Person(" xiaowang", 180);

var obj = {};

Person.call(obj, "wang", 175);  //this指向obj

console.log(obj);

```

借用别的函数实现自己的而功能

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
function Student(name, age, grade) {
  Person.call(this, name, age);
  this.grade = grade;
}
var student = new Student("jerry", 21, 2016);
console.log(student);

```

## apply

```js
func.call(this, arg1, arg2);
func.apply(this, [arg1, arg2])
```



## bind

```js
var bar = function(){
console.log(this.x);
}
var foo = {
x:3
}
bar(); // undefined
var func = bar.bind(foo);
func(); // 3
```

