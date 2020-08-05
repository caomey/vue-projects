# Node.js 插件

[在npmjs网站查询各种插件的使用方法](https://www.npmjs.com/)

## inflection

> 修改字符串命名规则

安装

- npm -i inflection

用法

- const name = require('inflection').classify(string)
  - 将字符串改为类名称：category => Category

## multer

安装

- npm -i multer

用法

```js
const multer = require('multer')
const upload = multer({dest:__dirname + '/../../uploads'})  //__dirname当前目录地址
```

## bcrypt

> 加密字符串密码

### 安装

- npm -i bcrypt

### 用法

```js
//加密
const name = require('bcrypt').hashSync(val,10) //数字为加密指数，越大越安全越费时，一般10-12
//校验
const isTrue = require('bcrypt').compareSync(明文，密文) //返回的布尔值
```



# jsonwebtoken

> 返回token码

安装

- npm -i jsonwebtoken

用法

```js
	const jwt = require('jsonwebtoken')
    jwt.sign({})
```

## mangoose

> 操作mongodb数据库

安装

- npm intsall  mangoose

安装

- npm install cors

## fs 库

```js
var fs = require('fs') // file system 读写文件

const fileContent = fs.readFileSync('D:\\ Fang\\ Jirengu\\ node-demo-1\\ db')  // 读

fs.writeFileSync（'D:\\Fang\\Jirengu\\node-demo-1\\db'，JSON.stringify（list））// 写

```

## qs

安装

```bash
npm i qs 
```

方法一：将对象序列化，多个对象之间用&拼接（拼接是由底层处理，无需手动操作）

```js
const qs = require("qs");
let a = { content: 111, name: 222 };
let b = "wd=mutation&rsv_spt=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8";
console.log(qs.stringify(a));
console.log(qs.parse(b));

out:
content=111&name=222
{
  'wd': 'mutation',
  rsv_spt: '1',
  f: '8',
  rsv_bp: '1',
  rsv_idx: '2',
  ie: 'utf-8'
}
```



方法二：将序列化的内容拆分成一个个单一的对象

```js
qs.parse() 转换成json对象
let comValue = qs.parse(comments)
```

## lodash

## vue-page-stack

页面缓存

## mockjs

模拟数据请求

## less

css预编译

## echarts

## element-ui



## sheetJS-xlsx

导入导出excel文件