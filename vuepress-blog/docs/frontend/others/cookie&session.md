### Cookie\ Session\ localStorage \sessionStorage\token知识梳理

- #### Cookie

  1. cookie存在于客户端

  2. 大小不超过4k

  3. 用于存储客户端用户信息

     1. 当用户访问web页面时，用户name可记录在cookie中
     2. 当再次访问时，可在cookie中检索用户sessionId访问记录

  4. cookie坚持同源http,访问服务器，请求页面时，属于该页面的cookie添加到该页面，服务端通过这种方式获取用户信息

  5. cookie存储形式:
      `username=WangyouLichuan`

  6. js增删改cookie

     1. 创建cookie`document.cookie="username=WangyouLichuan"`
     2. 可添加过期时间，默认：浏览器关闭删除cookie`document.cookie="username=Wangyou;expires=……"`
     3. 可添加cookie路径`document.cookie="username=John Doe; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/";`
     4. 读取cookie`let x=document.cookie`
     5. 改：类似于创建`document.cookie="username=lichuan"`
     6. 删除：删除时不必写值`document.cookie="username=`

  7. 完整实例

     

     ```javascript
     //创建cooKie存储访问者名称
     function setCookie(name,value, exdays){//输入key.key值，时间
         let d=new Date();
         d.setTime(d.getTime()+(exdays*24*60*60*1000));//转化格式
         let expires="expires="+d.toGMTString(); //创建过期时间
         document.cookie=name+"="+value+";"+expires//创建cookie
     }
     //获取cookie
     function getCookie(name){//输入要获取的key
         let name=name+"=";//指定检索值
         let ca=document.cookie.split(';')//分割，转数组
         for(let i=0;i<ca.length;i++){
             let c=ca[i].trim();
             if(c.indexof(name)==0){//判断检索内容是否存在
                 return c.substring(name.length,c.length)//存在则返回
             }
             return ''//不存在返回空
         }
         
     }
     //创建检测cookie是否创建函数
     function checkCookie(){
         //获取cookie值
         let username=getCookie("username")；
         if(username!=""){//cookie值存在
             alert("欢迎"+username)
         }else{//不存在，就创建cookie
             username=prompt("请输入名字:","");
             if(uername!=""&&username!=null){
                setCookie("username",user,30);
         }
     }
     ```

- #### Session

  > session是在无状态的http协议下，服务端记录用户状态是用于表示具体用户的机制。他是在服务器保存的用来跟踪用户的状态的数据结构，可以保存在文件、数据库或者集群中。
  >
  > 浏览器关闭后这次的session失效，再次打开SessionId更换

  > 多数情况下应用都是用Cookie实现Session跟踪，第一次创建Session时，服务端会在HTTP协议中告诉客户端，要在Cookie中记录一个SessionID，下次请求是把SessionID发送给服务器

- #### Session与Cookie的关系与区别

  1. `Session`是保存在服务端的一个数据结构，用来跟踪用户状态。`Cookie`是服务端保存用户信息的一种机制，也是实现Session的一种方式
  2. `Session`的`安全性`高于`Cookie`，他人可通过分析保存在本地Cookie，造成用户信息泄露，重要交互信息保存在Session中，一般信息保存在Cookie中
  3. 访问增多，`Session`会占用较大的服务器性能，考虑到性能问题，应适当使用Cookie
  4. 单个`Cookie`保存数据不超过`4k`.
  5. `Session`和`Cookie`相辅相成，Session的运行依赖`SessionID`,然而SessionID存在于Cookie，也就是说Cookie被禁用，Session失效

- #### localStorage和sessionStorage

  1. 共同点：

     > 1. 存储大小都是5M左右
     > 2. 都有同源策略限制
     > 3. 保存在客户端

  2. 不同点：

     > - 生命周期：
     >
     >   1. `localStorage`存储数据是`永久的`，除非`人为主动`删除
     >   2. `sessionStorage`浏览器或者`窗口关闭`，sessionStorage`数据删除`
     >
     > - 作用域
     >
     >   1. `localStorage` 在`同一浏览器内，`同源文档`中绝对lacalstorage进行操作
     >
     >   2. `sessionStorage`只有在同一窗口，统一浏览器的同源文档中才能共享数据
     >
     >      > 例如:在浏览器中打开了`两个相同地址`的页面A、B,虽然这两个页面的源完全相同，但是他们还是不能共享数据，因为他们是`不同窗口中`的。但是如果是一个窗口中，有两个同源的`iframe`元素的话，这两个`iframe`的 sessionStorage 是可以互通的。

  3. #### localStorage 和sessionStorage用法相同

     

     ```javascript
     localStorag.setItem("name","wangyoulichuan")//以name为key,xiaolin为值存储
     localStorage.getItem("name");//获取key为name的值
     localStorage.key(i);//获取第i个key
     localStorage.removeItem("name")//删除key为name的这条数据
     localStorage.clear()//清楚所有数据
     ```

- #### token

  - 基于token的身份验证（userID唯一用户识别+tampTime当前事件戳+sign签名）

    1. 用户通过用户名和密码发送请求
    2. 服务端进行验证
    3. 返回带签名的token,
    4. 存储token，通过token再次发送请求
    5. 服务器验证token，返回请求数据
    6. 每一次请求都要token

  - ##### session和token的区别

    1. session认证只是简单的把用户信息村吃在Session里，SessionID不可预测，不可共享于其他网站和第三方App
    2. token提供的事认证和授权，认证是针对用户，授权书针对App目的就是让某App有权访问用户信息，token是唯一的，token不能转移与其他App或其他用户（使用与App)
    3. session的状态存在服务端，sessionID存在客户端。
    4. token存储在客户端