# call / apply

## 作用

**改变this指向**

## 区别

**后面传参形式不同**

call需要把实参按照形参的个数传进去
apply 需要传一个arguments

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

## 

## apply

