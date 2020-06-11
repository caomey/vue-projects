# flex弹性盒子布局



## 二、基本概念

采用Flex布局的元素，称为Flex容器（flex container），简称”容器”。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称”项目”。

![](https://img-blog.csdnimg.cn/20190405163746672.png)

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

## 三、相关属性

**1、 flex-direction属性：**主轴的排列方向

```css
flex-direction: row //(默认) ----主轴为水平方向，起点在左端。
flex-direction: row-reverse // ----主轴为水平方向，起点在右端。
flex-direction: column // ----主轴为垂直方向，起点在上沿。
flex-direction: column-reverse // ----主轴为垂直方向，起点在下沿。
```

### 2、flex-wrap属性：定义元素的换行

```css
flex-wrap: nowrap //(默认) ----表示不换行，平分父元素
flex-wrap: wrap // ----表示换行布局
flex-wrap: wrap-reverse // ----换行布局，但首行在下方
```

### 3、flex-flow属性：属于以上两个属性的缩写

flex-flow 相当于 flex-direction 和 flex-wrap两个属性
前面记得加上：display:flex

```css
flex-flow：row nowrap //(默认)
```

### 4、justify-content属性：主轴方向上的对齐方式

```css
justify-content: flex-start //(默认) ----靠左对齐
justify-content: flex-end // ----靠右对齐
justify-content: center // ----居中排列
justify-content: space-between // ----两端对齐，项目之间的间隔都相等
justify-content: space-around // ----每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍
```

### 5、align-items属性：交叉轴方向上的对齐方式

```css
align-items: flex-start //(默认)----交叉轴的起点对齐
align-items: flex-end //----交叉轴的终点对齐
align-items: center //----交叉轴的中点对齐
align-items: baseline //----项目的第一行文字的基线对齐
align-items: stretch //----如果项目未设置高度或设为auto，将占满整个容器的高度
```

### 6、align-content属性：多根轴线的对齐方式

```css
align-content: stretch //(默认) ----轴线占满整个交叉轴
 align-content: flex-start // ----与交叉轴的起点对齐
 align-content: flex-end // ----与交叉轴的终点对齐
 align-content: center // ----与交叉轴的中点对齐
 align-content: space-between // ----与交叉轴两端对齐，轴线之间的间隔平均分布
 align-content: space-around // ----每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍

```

## 四、项目属性

1、order属性：order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

2、flex-grow属性：flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

3、flex-shrink属性：flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

4、flex-basis属性：flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

5、flex属性：flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。

```css
flex: 0 1 auto
```



6、align-self属性：align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。




##  问题总结

flex-grow  子元素会自动撑开剩余空间

```css

flex-grow:1//
```



## calc计算属性配合flex

```css
  .container {
    width: calc(100% / 3 - 1rem)//
  }
```

水平准确分布n个盒子， 并且留有缝隙

注意：盒模型为border-box，避免padding和border值影响宽度

1. 计算宽度calc(100% / n- 1rem)后，用 justify-content: space-evenly // 撑开剩余空间，缝隙尺寸为 n*1rem / (n+1)，但是间隙是均匀的
2. 计算宽度calc(100% / n- 1rem)后，用 justify-content:center，间隙用margin: 0 0.5rem  这个0.5rem刚好是1rem的一半， 和 设置justify-content: space-around 的结果一样
3. 考虑到多出子元素布局从左到右，使用justify-content:flex-start， 利用calc准确计算出width，margin值为减去值的一半，保证最后width总和是100%，只要父盒子居中，就能保证整体居中了

**进阶：**

**问题**：使用flex 的  justify-content:space-evenly（space-between) 会使最后一行元素不足时，中间出现空白，使用默认的 justify-content：felx-start,但是就不能响应式控制间隙

**解决1**：自己控制间隙，让弹性元素平均分布，按百分比计算宽度,为了是总宽度100%，要去减margin值（因为盒模型用的border-box，不需要计算padding值），但是还是觉得麻烦

**解决2**：justify-content:flex-start + 弹性元素套盒子

给弹性元素套个父盒子， 让父盒子平均分布，间隙由子盒子的margin值控制，这样就解决了justify-content:flex-start不能控制间隙的问题，有解决了宽度响应式的问题

```less
// 整体 justify-content:flex-start 
.wrapper {
    display:flex;
    flex-flow:row wrap;
    justify-content:flex-start;
    // 父盒子分摊100%的宽度
	.container {
      @media (max-width: 768px) {
        width: 50%;
      }
      @media (min-width: 768px) and (max-width: 1200px) {
        width: 100%/3;
      }
      @media (min-width: 1200px) {
        width: 25%;
      }
        // 子盒子控制间隙
        .son{
            margin:1rem;
        }
}
}
```





## css 高度随宽度比例变化

一个元素的 padding，如果值是一个百分比，那这个百分比是相对于其父元素的宽度而言的，padding-bottom 也是如此。

使用 padding-bottom 来代替 height 来实现高度与宽度成比例的效果，将 padding-bottom设置为想要实现的 height 的值。同时将

其 height 设置为 0 以使元素的“高度”等于 padding-bottom 的值，从而实现需要的效果

```html
<style type="text/css">
	.childbox{
		padding-bottom: 20%//
		width: 20%//
		height: 0//
		background: #888888//
	}
</style>
```

## flex是flex-grow、flex-shrink 、flex-basis缩写组合。

> 建议使用 flex 面不要单独使用 flex-grow / flew-shrink / flex-basis 。

```css
flex:1 0 100px
 // 表示尺寸可以变大 不进行缩小 基本尺寸为100px
```

flex：1，表示子元素会变大占据弹性父盒子的剩余空间，但是父盒子必须指定宽度或高度

## 自己的理解

1. 只要标签加了`display：flex `这个属性，那么这个标签就是一个弹性盒子，而且默认带有一个`flex-direction：row`的属性（这个容易忽略）， 为了不混淆，最好`display：flex`， `flex-direction：row`同时写

2. 单个盒子没有子盒子也可以设置为弹性盒子，用弹性盒子的属性来调整定位
3. 弹性盒子的大小受子盒子的大小影响