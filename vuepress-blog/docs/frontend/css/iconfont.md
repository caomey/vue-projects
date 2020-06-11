## iconfont

> 官网: https://www.iconfont.cn/

## 1. 添加样式

```html
 <link rel="stylesheet" href="https://at.alicdn.com/t/font_1870046_bknjr8c5x24.css"/>
```

注意：

1. http要改成https
2. 添加新的图标后要更新链接

## 2.伪元素添加icon

```css
::before {
    content: "\e61b";  //填写iconfont字体
    font-family: "iconfont" !important;
    font-size: 1rem;
}
```

