# 组件中引入js文件



```js
export default {
 mounted() {
  const s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = '你的需要的js文件地址'; // 可以是cdn,也可以是本地js文件
  document.body.appendChild(s);
 },
}
```

