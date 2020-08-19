# Node.js

Node.js 是 c++编写开发的，_Node_.*js*是一个基于 Chrome V8 引擎的 JavaScript 运行环境（语言解释器）,而 V8 引擎使用 C++开发,并在谷歌浏览器中使用

前端：JS

后端：Python/Java/PHP/Ruby 等

因为 Node.js 使得 JS 前后端通吃，后端框架 express，koa，前端：vue，react

特点：

- 事件驱动
- 非阻塞 IO

**盖房子与开发 Node 项目**

| 盖房子             | Node.js 项目                                    |
| ------------------ | ----------------------------------------------- |
| 打地基             | 安装 Node.js                                    |
| 房屋的基本框架结构 | Express-cli，vue-cli、create-react-app 等建项目 |
| 购买各种家具       | npm 安装各种包                                  |
| 摆放家具、装修     | 完善程序逻辑，将各种包整合起来                  |

## node 运行的四种方式

- 在 cmd 里运行 node

- node 接绝对路径

- node 接相对路径

  ```node
  node test.js
  ```

* node -e 接字符串

  ```node
  node -e console.log(1);console.log(2)
  ```

导入和导出js

es5

```js
//导出
module.exports a = {} / exports.a = {}
//导入
var a = require('./test.js')
```

es6

```js
//导出
export const a = {}
//导入
import {a} from './test.js'
```

## js中引入其他js文件

### es5

```js
//导出
module.exports = {}
//导入
var n = require('./test.js')
```

### es6

需要先安装bable

```js
npm i bable-cli -g
```



```js
//导出
export const n = {}
//导入
import {n} from "./test.js"
```

