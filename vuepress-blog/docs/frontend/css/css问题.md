# CSS



## css调试

css border调试大法

1. 可以给自己，父亲 兄弟姐妹，添加border查找问题所在
2. 调试发现没反应，很有可能是优先级的问题
3. 配合谷歌浏览器F12调试，查看参数

## z-index失效的几种情况

####   **注意点:**

####      (1):z-index属性只作用在被定位了的元素上。所以如果你在一个没被定位的元素上使用z-index的话，是不会有效果的. 

####      (2)同一个父元素下的元素的层叠效果会受父元素的z-index影响,如果父元素的z-index值很小,那么子元素的z-index值很大也不起作用



**失效的情况:**

1、父标签 position属性为relative；

2、问题标签无position属性（不包括static）；

3、问题标签含有浮动(float)属性。

4、问题标签的祖先标签的z-index值比较小



解决方法:

第一种: position:relative改为position:absolute；

第二种:浮动元素添加position属性（如relative，absolute等）；

第三种:去除浮动。

第四种:提高父标签的z-index值

## 颜色填充边界问题

1. 如果要颜色边界挨在一起，就不能使用margin
2. 用padding来撑大盒子，盒模型box-sizing要改为content-box
3. 先调整子盒子，用子盒子撑大父盒子，不然很难调

## img样式不生效

`<style> `上加了scope，去掉后生效了

## 文本自动换行问题

```css
word-wrap: break-word;
```

## 滚轮

```css
overflow-y: scroll;
```

## right 失效

因为同时设置left  和 right的话，left的权重比较高，此时right不生效。所以把left设置为initial，恢复为默认的样式



## 书写问题

1. body{} 写成 .body{}
2. 多标签用逗号隔开  .div1,.div2{}

## console 调试窗口下划线

可能的原因
1.该样式的写法已经被摒弃，但是浏览器一般还是会显示出你写的样式

2.你写的样式被相同的样式给覆盖了(可能是后面的样式，也可能是前面的样式)

解决：

！important

@media不生效，写在最后面，不然会被覆盖