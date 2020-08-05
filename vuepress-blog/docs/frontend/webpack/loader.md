文档定义loader为在模块加载时的**预处理文件**，loader**运行在打包文件之前**

# url-loader

## 作用:

1. 解决图片引用路径的问题
2. 图片较多时,**小图片**:将图片数据翻译成一串字符。再把这串字符打包到文件中,**图片较大**:通过http请求下载

## file-loader和url-loader的区别

url-loader封装了file-loader。url-loader不依赖于file-loader，即使用url-loader时，只需要安装url-loader即可，不需要安装file-loader，因为url-loader内置了file-loader。通过上面的介绍，我们可以看到，url-loader工作分两种情况：1.文件大小**小于**limit参数，url-loader将会把文件转为DataURL；2.文件大小**大于**limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader。因此我们只需要安装url-loader即可

```js
chainWebpack: config => {
    config.module
        .rule('images')
        .use('url-loader')
        .loader('url-loader')
        .tap(options => Object.assign(options, {
        limit: 15000
    }))
},
```



## 