# dependencies 和devDependencies区别

## 安装

devdependencies：开发环境使用--save-dev , -D
dependencies：生产环境使用--save, -S

## 生产环境

生产环境，类似与项目必须依赖的插件库，需要上传代码库的那些

## 开发环境

开发环境，不需要提交这些工具



## 区别

例如：weboack，gu1p等打包工具，这些都是我们开发阶段使用的，代码提交线上时，不需要这些工具，所以我们将它放入devDependencies即可，但是像 jquery这类插件库，是我们生产环境所使用的，所以如要放入dependencies，如果未将 query 安装到dependencies，那么项目就可能报错，无法运行，|所以类似这种项目必须依赖的插件库，我们则必须打入dependencies中。

---

想象下build完成之后,还需要哪些工具,就是放在dependencies中,不需要的放在devdependencies