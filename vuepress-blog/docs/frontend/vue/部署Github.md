# 部署 Github

[vue 官网部署文档](https://cli.vuejs.org/zh/guide/deployment.html),查看 GitHub Pages 的配置

1. 根目录下创建 vue.config.js

```sh
// vue.config.js 位于仓库的根目录下
// 确保用 GitLab 项目的名称替换了 `YourProjectName`

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/yourProjectName/'
    : '/'
}
```

2. 在项目目录下，创建内容如下的 deploy.sh

```sh
#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
npm run build

# cd 到构建输出的目录下
cd dist

# 部署到自定义域域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```

3. 仓库=>Settings,Source 选择

   1. gh_pages branch
   2. marster branch

4. 在 package.json 的 scripts 中添加
   ````js
      "deploy": "bash deploy.sh"
   ```
   **注意！**

github setting 里的 source 分支要和提交的分支相同

## 字体 iconfont 的路径 http 要改为 https
