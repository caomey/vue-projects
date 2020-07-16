# js 冒泡 与 捕获

简单介绍一下冒泡与捕获，`这个是两种的监听方式`，语言表达感觉表达不明，直接用一张图表达，会然你眼前一亮。

![img](https:////upload-images.jianshu.io/upload_images/21451412-71dae6901477d21c.png?imageMogr2/auto-orient/strip|imageView2/2/w/526/format/webp)

以上的表达是不是很清晰。
 `在不使用任何框架的情况下，我们在js中通过addEventListener方法给Dom添加事件监听： element.addEventListener(event,fn,useCapture)`

```
注：event：是事件的类型 (如 "click" 或 "mousedown")；`
 `function：是事件触发后调用的函数；`
 `useCapture：可选，返回值是布尔值，默认值为 false, 即冒泡传递
```

## 1，冒泡，通过 useCapture 来辨别冒泡与捕获

```jsx
window.onload = function () {
    var x = document.getElementById("myBt");
    x.addEventListener("click", myFunction);
};
```

## 2，捕获

```jsx
window.onload = function () {
    var x = document.getElementById("myBt");
    x.addEventListener("click", myFunction, true);
};
```

#### 2.1，`event.stopPropagation()：阻止事件的冒泡`

```jsx
$(document).ready(function () {
       $("span").click(function (event) {
                event.stopPropagation();// 阻止了事件冒泡
                alert("橘色的被点击了");
         });
        $("p").click(function (event) {
                alert("粉色被点击了");
        });
        $("div").click(function () {
                alert("蓝色的也被点击了");
        });
});
  
<div class="blue">
    蓝色背景
    <p>粉色<br>
         <span>橘色部分</span>
     </p>
</div>
```

#### 2.1，event.preventDefault() ：防止链接打开 URL

```php
<a href="http://baidu.com">百度</a>

$("a").click(function(event){
    event.preventDefault();
});
removeEventListener() :移除由 addEventListener() 方法添加的事件句柄:
```

```jsx
window.onload = function () {
    var x = document.getElementById("myBt");
    x.removeEventListener("mousemove", myFunction);
};
```

## 3，vue 处理冒泡与捕获事件：事件修饰符

##### 3.1，.once ：只执行一次

```csharp
// 第一次点击时，触发；之后再点就不出发事件了
<button v-on:click.once="doThing( ) "></button>
```

##### 3.2，.stop ：阻止单击事件冒泡

```jsx
// 阻止doThing事件继续向上冒泡，从而不触发stopUp事件
<div @click="stopUp()">
    <button @click.stop="doThing()">事件修饰符stop</button>
</div>
```

##### 3.3，.prevent ：阻止默认事件的发生

```dart
// 阻止默认事件的发生，但不阻止冒泡
<a href="http://www.baidu.com" @click.prevent="preventThing">百度链接</a>
```

##### 3.4，.capture ：捕获冒泡，只要有冒泡发生时，有该修饰符的dom元素会先执行，如果有多个，从外到内依次执行，然后再按自然顺序执行触发的事件。

```dart
// 只要里面有冒泡事件发生，就会最先被 capture 捕获到，之后再依次从内到外进行冒泡
<div @click.capture="captureThing()"> // 先执行第一步
   <div @click="stopUp()"> // 执行第三步
       <button style="width:380px;" @click="doThing()">事件修饰符capture</button> // 执行第二步
   </div>
</div>
```

##### 3.5，事件修饰符可以进行串联

```
.stop.prevent：注意顺序会影响它的执行的顺序
```

```dart
// 先阻止发生冒泡，之后再阻止默认事件的发生
<a href="http://www.baidu.com" @click.stop.prevent="preventThing">百度链接</a>
```

---

## 总结

1.element.addEventListener(event,fn,useCapture)

1. addEventListener(事件，处理函数，false)；【冒泡，默认】
2. addEventListener(事件，处理函数，true)； 【捕获】

**捕获和冒泡是完全按相反的**

```html
<body id="first">
    <div id="second" >
        <button id="third">
            <p id="button">点击冒泡</p>
        </button>
    </div>
</body>
```

冒泡(默认false)

```js
document.getElementById("button").addEventListener("click",function(){
             alert("button");
  });
document.getElementById("third").addEventListener("click",function(){
             alert("third");
});
document.getElementById("second").addEventListener("click",function(){
        alert("second");
});       
document.getElementById("first").addEventListener("click",function(){
         alert("first");
});
```

捕获(true)

```js
document.getElementById("button").addEventListener("click",function(){
             alert("button");
  },true);
document.getElementById("third").addEventListener("click",function(){
             alert("third");
},true);
document.getElementById("second").addEventListener("click",function(){
        alert("second");
},true);       
document.getElementById("first").addEventListener("click",function(){
         alert("first");
},true);

```



**stopPropagation()**!!!!!!!!!!

**事件阻止：stopPropagation()方法既可以阻止事件冒泡，也可以阻止事件捕获，也可以阻止处于目标阶段。**

```js
document.getElementById("button").addEventListener("click",function(event){
    alert("button");
    event.stopPropagation();  
},false);
```

**preventDefault() ： 通知浏览器不要执行与事件关联的默认动作。**







