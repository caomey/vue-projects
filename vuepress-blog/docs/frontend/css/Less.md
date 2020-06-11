## LESS

[less官网文档]（[https://less.bootcss.com/#%E6%A6%82%E8%A7%88](https://less.bootcss.com/#概览)）

为了使 CSS 更易维护和扩展，并减少在书写规则时对**权重**的思考，使用LESS是不错的主意。

很多软件提供了自动生成LESS的功能，下面是在VSCODE中使用的方法。

## 优先级问题

1.  越具体优先级越高，less也存在这个问题，嵌套越多优先级越高

2. 写在后面的，覆盖写在前面的

1. 安装插件

   ```sh
   // 全局安装
   npm install less -g
   // devDependencies
   npm i less -D
   ```

下面是一个LESS的示例

```text
main {
    article {
        h1 {
            color: red;
        }
    }
}
```

将生成 `css` 文件如下

```text
main article h1 {
  color: red;
}
```

##  &表示当前选择器的父级

```css
.clearfix {
  display: block;
  zoom: 1;

  &:after {
    content: " ";
    display: block;
    font-size: 0;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}
// &+表示相邻的下一个元素
& + input {
      display: none;
    }
```

##  ~转义（Escaping）

```css
@min768: ~"(min-width: 768px)";
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}
//在 Less 3.5+ 版本中，许多以前需要“引号转义”的情况就不再需要了。
@min768: (min-width: 768px);
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}
```

## 映射Map

```css
#colors() {
  primary: blue;
  secondary: green;
}

.button {
  color: #colors[primary];
  border: 1px solid #colors[secondary];
}
```

## 变量@

```less
@bg:#f2f2f2;
// darken加深颜色
&:nth-child(1){
    background: darken(@bg, 4%);
}
```



