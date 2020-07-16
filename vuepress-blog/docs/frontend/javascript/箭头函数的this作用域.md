# 箭头函数this

> 箭头函数不存在this,箭头函数从周围上下文继承了this的值,有点像作用域,this = 变量


```jsx
$('#category').children().each(function(){
            console.log(this);
```

这里的this指向某个child, 为啥这样可以, 却:

```jsx
$('#category').children().each(()=>{
            console.log(this);
```

这里的this指向#document, 为啥这样不行呢?

箭头函数没有this
 this取决于该函数被调用的位置

------

代码1这里的this在该function内 , 由于each是个callback, 调用function()的地方的
 的enclosure里有一个element, 所以this指向的是'那个'element.

代码2里的箭头函数没有this, 所以this将会寻找它的上一个函数each()被调用的作用域的this, #document, 所以this自然指向#document.

---

## 普通函数和箭头函数this

```js
var fn1 = () => {
  console.log(this);
};

var fn2 = function () {
  console.log(this);
};
fn1();
fn2();

out:
//箭头函数this
{}
// 普通函数this
Object [global] {
  global: [Circular],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Function]
  },
  queueMicrotask: [Function: queueMicrotask],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Function]
  }
}
```

## 普通函数this

某个对象调用使用this时,this才会被赋值, 赋给this的值取决于调用定义this的方法的对象

**谁调用,this指向谁**