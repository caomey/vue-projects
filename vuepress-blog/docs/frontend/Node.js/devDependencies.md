## cross-env

运行跨平台设置和使用环境变量的脚本

```json
{
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
  }
}
```

## http-server

http服务器是一个简单的零配置命令行http服务器。 它足够强大，足以用于生产用途，但它足够简单且易于破解，可用于测试，本地开发和学习。

```javascript
 http-server [path] [options]
 path就是你当前运行该命令下对应的某个文件夹名称
```

```js
http-server -c-1
```

## husky

husky可以防止错误的git commit，git push和更多woof！

```js
{
  "husky": {
    "hooks": {
      "pre-commit": "npm test",
      "pre-push": "npm test",
      "...": "..."
    }
  }
}
```

## graver-cli

