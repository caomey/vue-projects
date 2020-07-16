# css3瀑布流

1.**column-count**,列数

2.**column-gap**,列间距

3.**break-inside**,是否折断

```css
.waterfall{
    column-count: 2;   //显示两列
    column-gap: normal;  //列间距默认30px
}
.waterfall .item{
    break-inside: avoid;   //列里面的项不折断
}

```

