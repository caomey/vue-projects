# 文字转 markdown

## 引入 marked.js

> bootcdn

```html
<script src="https://cdn.bootcdn.net/ajax/libs/marked/1.1.0/marked.js"></script>
```

**使用方法：**
marked(md)

```html
<div class="text markdown-body" v-html="marked(md)"></div>
```

## 引入 markdown.css

> bootcdn

```html
<link
  href="https://cdn.bootcdn.net/ajax/libs/github-markdown-css/4.0.0/github-markdown.css"
  rel="stylesheet"
/>
```

**使用方法：**

给目标标签加上 class 属性 markdown-body

`<div class="markdown-body"> </div>`
