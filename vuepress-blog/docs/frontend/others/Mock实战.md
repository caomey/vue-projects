# Mock实战

> mock模拟数据可以实现增删改查, json文件做模拟接口是静态的

1. 先要接口文档， 然后mock生成数据

## 安装/使用

1. 在项目中安装mock

`npm install mockjs`

2. 新建 mock/index.js 文件

`import Mock from 'mockjs'`

3. 将mock文件在main.js中导入

   ```js
   import Vue from 'vue'
   import App from './App.vue'
   import './mock/index.js'  //上线时只要把这句注释掉其他都不用改
   
   Vue.config.productionTip = false
   new Vue({
       router,
       render: h => h(App)
   }).$mount('#app')
   ```

   

## Mock语法

```js
import Mock from 'mockjs'

// 生成指定范围长度的标题句子
const data = Mock.mock({
    title: '@ctitle(5,50)',
    sentence: '@csentence(5,50)',
})
// 生成8份数据
const data = Mock.mock({
    list|8:{
    name:'@cname()',
    address: '@city(true)',
    id:'@increment(1)'
}
})
// 生成图片 @image('100x100',@color, @color, @cname)
const image = Mock.mock({
    image: '@image("300×250，“#ff0000”，“#fff"，"gif"，“坤坤")'
})
```

## mock拦截请求

> 根据接口文档，模拟接口生成数据

### 定义get请求

```js
const { newsList } Mock.mock({
    'newsList|5-50':[
        {
           "id":'@increace(1)',
           "title":'@ctitle()',
           "content":'@cparagraph(5,15)',
           "img_url":"@image('100x100','#FF83FA','#FCFCFC', 'png', '小明')",
           "add_time": "@date((yyyy-MM-dd hh:mm:ss))",
        }
    ]
})
// 定义模拟请求数据接口
// 拦截地址必须和axios请求地址一样
// axios未设置baseURL
Mock.mock（"/api/get/news'，'get',() =>{
    return{ 
        status：200,
        message:'获取新闻列表数据成功',
        list:newsList,
        total:newsList.length
    }
})
// axios 设置baseURL
import axios from 'axios'
Vue.prototype.$http = axios.create()
Vue.prototype.$http.defaults.baseURL = 'http://localhost:8080/'
Mock.mock（"http://localhost:8080/api/get/news'，'get',() =>{
    return{ 
        status：200,
        message:'获取新闻列表数据成功',
        list:newsList,
        total:newsList.length
    }
})

```

