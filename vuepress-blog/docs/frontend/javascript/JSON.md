JSON

JSON

- JS中的对象只有JS自己认识，其他的语言都不认识

- JSON就是一个特殊格式的字符串，这个字符串可以被任意的语言所识别，并且可以转换为任意语言中的对象，JSON在开发中主要用来数据的交互

- JSON

  - Javascript Object Notation JS对象表示法
  - JSON和JS对象的格式一样，只不过JSON字符串中的属性名必须加**双引号**

  

  其他的和JS语法一致

  - JSON分类：

  1. 对象{}
  2.  数组[]

  - JSON中允许的值：
    1. 字符串
    2. 数值
    3. 布尔值
    4. nul1 
    5. 对象
    6. 数组

## json --> js对象

```js
JSON.parse(json)
```

## js对象 --> json

```js
JSON.stringify(obj, replacer, space)
JSON.stringify(obj, null, 2)
```

**第二个参数**是一个replacer，replacer可以是一个函数或者一个字符串数组

当replacer是数组时，相当于一个白名单，只有在这个数组中的属性最终会被序列化

**第三个参数**表示的是每个字符前的缩进，可以是字符串，或者数字，数字表示的是缩进的空格，最大为10

```js
var a = {
  a: 1234,
  b: {
    c: 4,
    d: 5,
  },
};

const b = JSON.stringify(a, ["b"], 5);

console.log(b);

out:
{
     "b": {}
}
```

