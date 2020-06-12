# parcel

## 介绍

parcel是一个类似于webpack的前端打包工具。相对于webpack。它的优势在于不需要繁琐的配置。

## 安装

```sh
npm i parcel -g
```

## 使用

```sh
parcel index.html
```

## parcel打包工具

```sh
npm install parcel-bundler -S
```

## 使用

```sh
parcel build index.html
```

注意事项：

1. 用parcel部署简单网页，需要更改html中script引入js的路径，默认是域名地址
2. parcel会合并所有style，由于pandas项目，需要两个style标签，一个存不变的style样式，一个是变化的style样式，需要手动修改

## 自动刷新

重点：parcel index.html 需要引入 index.js 否则不自动刷新