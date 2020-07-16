# Webpack 是什么

[webpack官网](https://www.webpackjs.com/concepts/loaders/)

webpack 是一个现代**JavaScript**应用程序的静态模块**打包器**

## 为什么要打包

逻辑多、文件多，项目的复杂度提高了。

## webpack的打包机制

### 1.立即执行函数

webpack打包生成的立即执行函数，传入参数为模块
webpack会把js打包成一个立即执行函数，所有js模块整合成数组作为入参传入立即及执行函数中
核心方法：
1.检查模块ID是否导入过
2.执行模块
3.return模块返回值

## webpack打包过程

- 从入口文件开始，分析整个应用的依赖树
- 将每个依赖模块包装起来，放到一个数组中等待调用
- 实现模块加载的方法，并把它放到模块执行的环境中，确保模块间可以互相调用
- 把执行入口文件的逻辑放在一个函数表达式中，并立即执行这个函数

## 配置开发环境---npm与包管理器

依赖环境Node.js

npm init -y
生成package.json文件， 记录包的版本信息

- dependencies放功能性的包
- devdependencies 本地开发时才用到的包（构建工具，检测工具eslint等）

name：包名称
version：版本号
main：执行入口
scripts：自定义脚本， npm run 脚本命令

语义化版本

- ^version：中版本和小版本。^1.0.1  ->   1.x.x,最新版本
- ~version：小版本   ~1.0.1 -> 1.0.x,最新版本
- version：特定版本

npm install的过程

- 寻找包版本信息文件（package.json），依照它来进行安装
- 查package.json中的依赖，并检查项目中其他的版本信息文件
- 如果发现了新包，就更新版本信息文件

## webpack核心特性

webpack配置，新建webpack.config.js

```js
const path = require("path");
const UglifyJsPlugin = requre("uglifyjs-webpack-plugin")
module.exports = {
  mode:'production', //编译时压缩
  entry: "./app.js", // 入口文件，默认是src下的main.js
  output: {
    path: path.join(__dirname, "dist"),// 必须是绝对路径
    filename: "bundle.js", //默认生成dist下的main.js
  },
  // 文件加载器loader
  module:{
        rules:[
        {
            test: /\.css$/,
            use:['style-loader',
        'css-loader'] //loader顺序有要求，配置顺序和加载顺序相反
        }
        ]
	},
    plugins:[
        new UglifyJsPlugin()
    ],
    devServe:{
      port:3000,// 服务端口
      publicPath:"/dist"  //打包后的资源路径
   }
};

```

entry：工程资源入口
output：打包结果



## loader和plugin

相同点：都是增强webpack功能
区别：plugin事件监听，改变文件打包后输出结果

### loader

**一切资源介模块**，在module中添加loader

可以导入css，less 等非js模块，需要用到loader

比如导入css需要这两个loader才能生效
npm i css-loader style-loader  -S

babel-loader

exclude 排除loader需要处理的文件，比如node_module
cacheDirectory：true，是否对编译结果进行缓存

### plugin

uglifyjs-webpack-plugin
添加压缩功能，去掉空格注释等，减小代码体积



## webpack构建工程

### babel

ES6编译成ES5，高版本转化成低版本
bable配置，可以卸载package.json 里面 ，也可以单独写在.babelrc里

**热更新**

plugins：[new webpack.HotModuleReplacementPlugin()]
devServer：{hot：true}



## webpack性能调优

1.打包结果优化,空间维度（体积小）

webpack自带压缩工具：tenser-webpack-plugin

```js
module.exports = {
   optimization:{
     minimizer:[new TerserPlugin({
               //加快构建速度
       cache:true,
		parallel:true,//开启多线程
       terserOptions:{
          compress:{
		    unused:true,//剔除无用代码
         	drop_debugger:true,
			drop_console:true,
			dead_code:true,
           }
           }
          })
       ]
   } 
}

```

**webpack-bundle-analyzer**
npm i webpack-bundle-analyzer
打包结果可视化，看哪个文件占据比较大内存空间，从特别大的文件着手进行构建体积的优化

2.构建过程优化,时间维度（构建快）

module：{
	noParse：/node_modules\/(jquery\.js)/,
}
exclude:
include:

思路：
1.减少查找，
2.减少解析，
3.多线程提升构建速度（HappyPack多进程，thread-loader）
nodejs是单线程的

更换loader：sass-loader 替换成 fast-sass-loader

3.tree-shaking摇树

webpack自带的， 需要 mode指定为 production

```js
"scripts":{"build":"webpack --mode  production"}
```

消除无用的js代码DCE, 去掉无用的引用

---

四个**核心概念**：

- 入口(entry)
- 输出(output)
- loader
- 插件(plugins)

## mode[模式]

```js
module.exports = {
  mode: 'production' // development
};
```

## entry[入口文件]

```js
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```

## output[出口文件]

```js
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```

## loader

1. `test` 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
2. `use` 属性，表示进行转换时，应该使用哪个 loader。

```js
const path = require('path');
const config = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' } //use数组里中的1oader的顺序，是从下到上，逆序执行
    ]
  }
};
module.exports = config;
```

## plugins[插件]

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件
const config = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
module.exports = config;
```

## devServer[热替换]

```js
devServer: {
  contentBase: path.join(__dirname, "dist"),//项目构建路径
  compress: true,//gzip 压缩
  port: 3000, // 端口号
  open:true, //自动打开浏览器
  hot: true,//默认热更新
}
```



---

## webpack优化

### 1.优化分析工具

webpack-bundle-analyzer, 可视化展现分析包的大小

### 2.空间维度

> 打包结果优化,空间维度（体积小）

1. 压缩

   tenser-webpack-plugin,自带的

   compression-webpack-plugin,gzip压缩

   ```js
   devServer: {
     compress: true,//gzip 压缩
   }
   ```

   

2. 使用cdn

3. 使用include或者exclude配置，来避免重复打包

   ```js
   { 
       test: /\.js$/, 
           //使用include来指定编译文件夹
       include: path.resolve(__dirname, '../src'),
           //使用exclude排除指定文件夹
       exclude: /node_modules/
       use: [{
           loader: 'babel-loader'
       }]
   		}
   ```

   

### 3.时间维度

> 构建过程优化,构建快,减少打包时间

1. 缓存

   cache-loader

2. 启用多线程

   thread-loader

3. 更换loader

   sass-loader 替换成 fast-sass-loader

4. production 模式自带打包优化

   消除用代码, tree shaking , webpack自带的， 需要 mode指定为 production

---



## loader和plugins的区别

1 .文档定义loader为在模块加载时的预处理文件，故loader运行在打包文件之前。
2 . plugins的定义为处理loader无法处理的事物，例如loader只能在打包之前运行，但是plugins在整个编译周期都起作用。

**loader运行在打包文件之前,plugins在整个编译周期都起作用**








