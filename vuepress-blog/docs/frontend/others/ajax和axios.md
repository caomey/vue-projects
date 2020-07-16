# Ajax、Axios、fetch

## Ajax

### 什么是Ajax（无刷新数据读取）

Ajax 提供了一种方式，让你无需刷新页面就可以异步获取数据

Ajax 的核心就是 浏览器提供的XHR(XMLHttpRequest) 对象

原理：ajax库是对XMLHTTPRequest对象的一种封装,是XMLHTTPRequest的一个实例

### ajax的缺点

传统 Ajax 指的是 XMLHttpRequest（XHR）， 最早出现的发送后端请求技术，隶属于原始js中，核心使用XMLHttpRequest对象，多个请求之间如果有先后关系的话，就会出现**回调地狱**。
 JQuery ajax 是对原生XHR的封装，除此以外还增添了对**JSONP**的支持。经过多年的更新维护，真的已经是非常的方便了，优点无需多言；如果是硬要举出几个缺点，那可能只有：
 1.本身是针对MVC的编程,不符合现在前端**MVVM**的浪潮
 2.基于原生的XHR开发，XHR本身的架构不清晰。
 3.JQuery整个项目太大，单纯使用ajax却要引入整个JQuery非常的不合理（采取个性化打包的方案又不能享受CDN服务）
 4.不符合关注分离（Separation of Concerns）的原则
 5.配置和调用方式非常混乱，而且基于事件的异步模型不友好。

### jQuery 中的 AJAX

```
$.ajax({
  url: '/time',
  type: 'get',
  dataType: 'json',
  data: { id: 1 },
  success: function (data) {
    console.log(data)
  },
  error: function (xhr) {
    console.log(xhr)
  },
})
```

常用选项参数介绍：

- url：请求地址
- type：请求方法，默认为 `get`
- dataType：服务端响应数据类型
- contentType：请求体内容类型，默认 `application/x-www-form-urlencoded`
- data：需要传递到服务端的数据，如果 GET 则通过 URL 传递，如果 POST 则通过请求体传递
- timeout：请求超时时间
- beforeSend：请求发起之前触发
- success：请求成功之后触发（响应状态码 200）
- error：请求失败触发
- complete：请求完成触发（不管成功与否）

---

## Axios

axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端，本质上也是对原生XHR的封装，只不过它是Promise的实现版本，符合最新的ES规范，它本身具有以下特征：
　　1.从浏览器中创建 XMLHttpRequest
　　2.支持 Promise API
　　3.客户端支持防止CSRF(cross-site request forgery)
　　4.提供了一些并发请求的接口（重要，方便了很多的操作）
　　5.从 node.js 创建 http 请求
　　6.拦截请求和响应
　　7.转换请求和响应数据
　　8.取消请求
　　9.自动转换JSON数据

**axios既提供了并发的封装，也没有fetch的各种问题，而且体积也较小，当之无愧现在最应该选用的请求的方式。**

### GET方法

```js
Axios.get('demo/url', {
    params: {
        id: 123,
        name: 'Henry',
        sex: 1,
        phone: 13333333
    }
})
```

### DELETE方法

```js
Axios.delete('demo/url', {
    data: {
        id: 123,
        name: 'Henry',
        sex: 1,
        phone: 13333333
    }
})
```



### POST方法

```js
Axios.post('demo/url', {
    id: 123,
    name: 'Henry',
    sex: 1,
    phone: 13333333
})
```



### PUT方法

```js
Axios.put('demo/url', {
    id: 123,
    name: 'Henry',
    sex: 1,
    phone: 13333333
})
```



### PATCH方法

```js
Axios.patch('demo/url', {
    id: 123,
    name: 'Henry',
    sex: 1,
    phone: 13333333

})
```

---

## Fetch

**fetch号称是AJAX的替代品，是在ES6出现的，使用了ES6中的promise对象**。Fetch是基于promise设计的。Fetch的代码结构比起ajax简单多了，参数有点像jQuery ajax。但是，一定记住fetch不是ajax的进一步封装，而是原生js，没有使用XMLHttpRequest对象。
fetch的优点：
1.符合关注分离，没有将输入、输出和用事件来跟踪的状态混杂在一个对象里
2.更好更方便的写法,fetch的优势主要优势就是：

```

1.  语法简洁，更加语义化
2.  基于标准 Promise 实现，支持 async/await
3.  同构方便，使用 [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)
4.fetch请求默认是不带cookie的，需要设置fetch（URL，{credentials:’include’})。
5.更加底层，提供的API丰富（request, response）
6.脱离了XHR，是ES规范里新的实现方式
7.fetch只对网络请求报错，对400，500都当做成功的请求，服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。
1）fetch默认不会带cookie，需要添加配置项： fetch(url, {credentials: 'include'})
2）fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费
3）fetch没有办法原生监测请求的进度，而XHR可以
```

### 1.GET请求

```
fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(e => console.log("Oops, error", e))
```

- response.arrayBuffer()
- response.blob()
- response.formData()
- response.json()
- response.text()

### 2.post请求

```
fetch(url,{
            method:'POST',
            headers:{
                'Content-type':'application/json'// 设置请求头数据类型
            },
            body:data
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
```

### 3.put请求

```
fetch(url,{
            method:'PUT',
            headers:{
                'Content-type':'application/json'// 设置请求头数据类型
            },
            body:data
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
```

### 3.delete请求

```
fetch(url,{
            method:'DELETE',
            headers:{
                'Content-type':'application/json'// 设置请求头数据类型
            },
            body:data
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
```



























