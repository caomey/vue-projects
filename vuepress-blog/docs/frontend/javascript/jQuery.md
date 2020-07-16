# jQuery

## jQuery的作用

1.访问和操作DOM元素
2.控制页面样式
3.对页面事件的处理
4.与Ajax技术的完关结合
5.大量插件在页面中的运用

## 搭建Jquery开发环境

1. jquery-1.8.2.js,开发时选择非压缩版本

2. jquery-1.8.2.min.js,部署时使用压缩版本

```html
<script type="text/javascript" src="js/jquery-1.8.2.js"></script>
```

## 编写jQuery的HelloWorld

```js
$(document).ready(function(){})
// 类似于 window.onload=function(){}
//简化
$(function(){}) // 页面加载完
```

1.window.onload绑定多次,只执行最后一次

2.多个$(function(){}),从上到下执行

## jQuery选择器



### 基本选择器

#id 选择器

```js
$('#id').css("color",'red')
```

.class 选择器

```js
$('.class').css("color",'red')
```

div 标签选择器

```js
$('div').css("color",'red')
```

逗号隔开控制多个选择器

```js
$('#id,.class').css("color",'red')
```

### 层次选择器

层次选择器通过DOM元素间的层次关系获取元素，其主要的层次关系包括后代、父子、相邻、兄弟关系，通过其中某类关系可以方便快捷地定位元素

| 选择器 | 功能描述 |
|- | - |
| ancestor descendant | 根据祖先元素匹配所有的后代元素 |
| parent>child | 根据父元素匹配所有的子元素 |
| prev+next | 匹配prev后的相邻元素 |
| prev-siblings | 匹配prev后面的所有兄弟元素|

### 过滤选择器 ":"

:first :last :even :odd :not :eq

```js
$("tr:even:not(:first)") //隔行换色
```

## jQuery操作DOM

两用,一个参数获取该属性,两个参数赋值

### 属性操作

### attr / removeAttr

```js
$("img").attr("src")
```

### addClass / removeClass

### toggleClass

如果存在就删除,如果不存在就添加!!!

### html

### text

### val

## 文档处理

### append

```js
$('body').append()
```

### remove

```js
$('p').remove()
```

### 遍历元素

each

```js
$('img').each(function(){})
```







## 事件绑定

### 冒泡

包含关系,会有冒泡机制,外层也会触发事件,阻止冒泡

1. **return false**
2. **unbind**

### click

```js
$('#id').click(function(){})
```

### bind

可以绑定多个事件

```js
$('#btn').bind("click mouseout", function(){})
```

### unbind

解绑事件

```js
$('#btn').unbind("click")
```

**hover**

鼠标移入移出

```js
$('img').hover(function(){},function(){})
```



**toggle**

点击事件,可以放多个函数

```js
$('img').toggle(function(){},function(){},function(){})
```



**blur**

当输入域失去焦点 (blur) 时改变其颜色：

```js
$("input").blur(function(){
  $(this).css("background-color","#D6D6FF");
});
```





## Ajax





```js
$.ajax({
	type:"POST",
    url: ,
    data: ,
    success:function(){},
    
})


```



















