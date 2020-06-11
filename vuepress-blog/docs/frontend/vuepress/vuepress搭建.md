# Vuepress 搭建个人博客

## 一. 开始搭建

1. 全局安装 Vuepress
   ```sh
   npm i -g vuepress
   ```
2. 创建项目并进入
   ```sh
   mkdir vuepress-blog && cd vuepress-blog
   ```
3. 打开 vscode
   ```sh
   code .
   ```
4. 初始化项目
   ```sh
   npm init -y
   ```
   在生成的 package.json 中添加启动命令
   ```json
    "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
    }
   ```

## PWA

1. 安装
   ```sh
   npm install -D @vuepress/plugin-pwa
   ```
2. 使用
   ```sh
   module.exports = {
   plugins: ['@vuepress/pwa']
   }
   ```

- 更新提示，离线可访问，还有更多
- 配置 manifest 和 icons
- 配置 head links
- 开发者工具 Application 验证

[manifest icons generator](https://app-manifest.firebaseapp.com/)

## [vuepress 自动生成侧边栏](https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar/)
:tada: [视频地址](https://www.bilibili.com/video/av43316513/) :tada:

1. 安装
   ```sh
   npm i vuepress-plugin-auto-sidebar -D
   ```
2. 使用
   ```js
   // **/.vuepress/config.js
   module.exports = {
     plugins: {
       "vuepress-plugin-auto-sidebar": {
          nav:true // 生成nav.js 导航栏, 第一次运行时生产成，后续添加需要删除重新初始化
       },
     },
   };
   ```

3. 配置
   1. 删除 themeConfig sidebar: "auto" 属性
   2. 替换 themeConfig nav 为 nav.js
