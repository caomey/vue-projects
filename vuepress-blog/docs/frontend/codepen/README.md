# 记录 codepen 上一些酷炫的模板

## 原理

```js

const w = 1200;
const h = 1000;
const p = Array(Math.floor(w / 10) + 1).fill(0);
console.log(p)
// 记录列数，值为0的数组
const random = (items) => items[Math.floor(Math.random() * items.length)];
const hex = "0123456789ABCDEF".split("");
console.log(hex)
// 0-F字符集
p.map((v, i) => {
console.log(random(hex), i _ 10, v);
// 每次写的字，x,y坐标
p[i] = v >= h || v > 50 + 10000 _ Math.random() ? 0 : v + 10;
//变更p的值, v每次加10， 超过屏幕或者超过（50—1050)就 清0
});

```
