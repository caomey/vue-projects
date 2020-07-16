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
qs.stringify()    转换成查询字符串
let comments = {content: this.inputValue}
let comValue = qs.stringify(comments)
```



方法二：将序列化的内容拆分成一个个单一的对象

```js
qs.parse() 转换成json对象
let comValue = qs.parse(comments)
```

