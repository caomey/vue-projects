# npm基本命令

npm（Node Package Manager）意思是 node 的包管理器，它是随着 NodeJs 安装时一起被安装的；

无论是在前端还是在前端开发中都会使用到 npm 包管理器。（前端框架开发react、Vue...，后台 node 开发）；

可复用代码仓库，避免重复造轮子，共享劳动成果

## 2、安装

去官网下载对应操作系统的 nodeJS，官网地址：https://nodejs.org/en/download/

## 3、npm简单命令使用

初始化package.json

```js
npm init -y
```
<<<<<<< HEAD
<<<<<<< HEAD



=======
>>>>>>> b768e5be55bf3008c75bd8be0c7db17bbf4591fa
=======
>>>>>>> 4421e6bd6efc0e415436f1b199c671c1e4b8e89f
1. npm -v 查看 npm 的版本

   ```sh
   npm -v
   ```

   

2. 安装包方法 npm install xx

   1. 全局安装

      ```sh
      npm i vue -g
      ```

      

   2. npm install xx --save  或 npm i xx -S   生产环境（dependencies）记录 下载包的版本信息

      ```sh
      npm i less -S
      ```

   3. npm install jquery --save-dev 或 npm i jquery -D 开发环境（devDependencies）记录 下载包的版本信息

      ```sh
      npm i vue -D
      ```

3. 生成package.json 文件(-y 表示全部yes)

   ```sh
   npm init -y
   ```

4. 卸载安装的包 npm uninstall xx 或 npm remove xx

   ```sh
   npm uninstall vue
   npm remove vue
   ```

5. npm info xx 查看包的详细信息

   ```sh
   npm info vue
   ```

6. 查看一个包存在的所有版本号 npm view xx versions

   ```sh
   npm view vue versions
   ```

7. 查看指定包当前的最新版本 npm view xx version

8. 下载指定版本的包 npm install xx@3.4.1

   ```sh
   npm i jquery@3.4.1
   ```

9. npm list 查看项目安装了哪些包	

   ```sh
   npm list
   ```

10. npm root -g 查看全局安装包的存放位置

    ```sh
    npm root -g 
    ```

    

11. npm audit fix  包的修复 ，一般是包的更新

12. npm ls xx 查看当前安装包的版本

    ```sh
    npm ls vue
    ```

13. 更改 npm 的下载镜像为淘宝镜像

    ```sh
    npm config set registry https://registry.npm.taobao.org  
    ```

    





