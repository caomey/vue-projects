# VueRouter

## 安装vue-router

```bash
npm i vue-router -S
```

## 配置

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    routers:[
        {path:'/',component:page1},
        {path:'/page2',component:page2},
    ]
})

export default router
```

## 注册到main.js

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'

Vue.use(VueRouter)
new Vue({
    el:'#app',
    router,		//$router $route
    render(h){
        return h(app)
    }   
})
```

## 动态路由匹配

### 方式一，动态路由参数

```js
const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id/:name', component: User }
  ]
})
```

url: localhost:3000/user/1/zhangsan

获取参数 this.$route.param

```html
<div>User {{ $route.params.id }} {{ $route.params.name }}</div>
```

### 方式二，URL 查询参数

```js
const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user', component: User }
  ]
})
```

url: localhost:3000/user?id=1&name=zhangsan

如果 URL 中有查询参数

```html
<div>User {{ $route.query.id }}</div>
```

## 捕获所有路由或404 Not found 路由

### 通配符

```js
{
  // 会匹配以 `/user-` 开头的任意路径
  path: '/user-*'
}
{
  // 会匹配所有路径
  path: '*'
  component:None,//放404页面
}
```

匹配的**优先级**就按照路由的定义顺序：谁先定义的，谁的优先级就最高。

所以"*"放在最后面，当上面路径都不匹配时，跳转404页面

## 嵌套路由

组件与组件相互嵌套，就有路由嵌套的问题,使用children

`<router-view/>`路由插槽

```js
{
  path:"/main",
  component:main,
  children:[
      {
          path:"",
          component:tab1
      },
      {
          path:"tab2",
          component:tab2
      }
  ]
}
```

## 响应路由参数变化

例如从 `/user/foo` 导航到 `/user/bar`，**原来的组件实例会被复用**，复用则显得更加高效。**不过，这也意味着组件的生命周期钩子不会再被调用**。

复用组件时，想对路由参数的变化作出响应的话

### 一，watch

```js
const User = {
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
    }
  }
}
```

### 二,导航守卫

**beforeRouterUpdate**

```js
const User = {
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}
```

### 三,updated

## 编程式导航

除了使用 `<router-link>` 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。

**router.push()**

| 声明式                    | 编程式             |
| ------------------------- | ------------------ |
| `<router-link :to="...">` | `router.push(...)` |

**router.replace()**

跟 `router.push` 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

| 声明式                            | 编程式                |
| --------------------------------- | --------------------- |
| `<router-link :to="..." replace>` | `router.replace(...)` |

**router.go(n)**

这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 `window.history.go(n)`

```js
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100)
```

`router.push`、 `router.replace` 和 `router.go`

`window.history.pushState`、 `window.history.replaceState` 和 `window.history.go`

## 命名视图

想同时 (同级) 展示多个视图components，而不是嵌套展示

多个router-view,需要加上name,没有设置名字，那么默认为 `default`

```html
<router-view ></router-view>
<router-view name="a"></router-view>
<router-view name="b"></router-view>
```

```js
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

##  重定向和别名

重定向redirect

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})
```

别名alias, n=>news

```js
const router = new VueRouter({
  routes: [
    { path: '/news', component: A, alias: '/n' }
  ]
})
```

## 路由组件传参 props:true

id代替$router.params.id或者$router.query.id,简单很多

```js
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },

    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
```

## HTML5 History 模式

```js
const router = new VueRouter({
  mode: 'history',
  routes: [
      { path: '*', component: NotFoundComponent }
  ]
})
```

默认hash模式,`http://yoursite.com/#/user/id`

当你使用 history 模式时，URL 就像正常的 url，例如 `http://yoursite.com/user/id`，也好看！

前提是要先后端配置

```js
const http = require('http')
const fs = require('fs')
const httpPort = 80

http.createServer((req, res) => {
  fs.readFile('index.htm', 'utf-8', (err, content) => {
    if (err) {
      console.log('We cannot open "index.htm" file.')
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    res.end(content)
  })
}).listen(httpPort, () => {
  console.log('Server listening on: http://localhost:%s', httpPort)
})
```

---

---

## router-view

### 一,一个页面使用多个`router-view`显示不同的内容

`<router-view/>`标签

```vue
<template>
  <div id="app">
    <router-view></router-view> // 默认default
     <router-view name="a"></router-view> //name为a的组件
  </div>
<template/>
```

### 二,路由嵌套和`router-view`

```js{
{
  path:"/main",
  component:main,
  children:[
      {
          path:"",
          component:tab1
      },
      {
          path:"tab2",
          component:tab2
      }
  ]
}
```

### 三,`router-view`的`key`属性

我`创建`和`编辑`的页面使用的是同一个 `component`，默认情况下这两个页面切换时并不会触发 `vue` 的 `created` 或者 `mounted` 钩子，[官方说](https://links.jianshu.com/go?to=https%3A%2F%2Frouter.vuejs.org%2Fzh%2Fguide%2Fadvanced%2Fdata-fetching.html%23%E6%95%B0%E6%8D%AE%E8%8E%B7%E5%8F%96)你可以通过 `watch $route` 的变化来进行处理，但说真的还是蛮麻烦的。后来发现其实可以简单的在 `router-view` 上加上一个唯一的`key`，来保证路由切换时都会重新渲染触发钩子了。这样简单的多了。

```html
<router-view :key="key"></router-view>
<!--
<router-view :key="$route.path"></router-view>
-->
computed: {
  key() {
    // 只要保证 key 唯一性就可以了，保证不同页面的 key 不相同
    return this.$route.fullPath
  }
 }
```

四, `router-view` & `keep-alive` & vue-page-stack

为了让组件数据缓存，避免每次资源重复加载（如tab标签页切换页面时，每次点完一个，回头点之前的，就会重新加载，体验真的差），因此使用了`keep-alive` 【不知道这点和上述说的key不同会重新触发是否矛盾，待验证...】

网上有很多其他的情况导致的缓存不生效，这里不多阐述。如：项目中存在多个`<router-view>`标签，并且其中存在嵌套。那么在外层的`<router-view>`上加`<keep-alive>`标签会导致组件初始化两次，第二次初始化并没有进行缓存。所以将`<keep-alive>`移到内层的`<router-view>`上。

```html
<!--
在这里keep-alive配合了router-view使用，
keep-alive本身是vue2.0的功能，并不是vue-router的，
 -->
<template>
  <div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<!-- 新版本：exclude & include-->
<keep-alive>
      <router-view exclude="detail"></router-view>
</keep-alive>
```

### vue-page-stack 单页应用导航管理器

比`Vue`自带的`keep-alive`组件要好很多，因为`keep-alive`缓存一次之后在`keep-alive`组件`destroyed`之前所有的缓存是不会销毁的，但是`vue-page-stack`是根据UI层级关系进行缓存和销毁的

安装

```bash
npm install vue-page-stack
```

`vue-page-stack`将栈上的UI存储，回退的时候再拿出来激活，并且将不用的组件缓存清除；而`keep-alive`会把你激活过的所有组件都缓存下来

```vue
  <vue-page-stack>
    <router-view />
  </vue-page-stack>
```

前进和后退

如果想在页面前进或者后退的时候添加一些动画，可以通过`stack-key-dir`进行判断

```js
// App.vue
$route(to, from) {
  if (to.params['stack-key-dir'] === 'forward') {
    this.transitionName = 'forward';
  } else {
    this.transitionName = 'back';
  }
}
```

**功能特性**

在vue-router上扩展，原有导航逻辑不变

⚽`push`或者`forward`的时候重新渲染页面，Stack中会添加新渲染的页面

🏆`back`或者`go(负数)`的时候先前的页面不会重新渲染，而是从Stack中读取，并且这些页面保留着先前的内容状态，例如表单内容，滚动条滑动的位置等

🏈`back`或者`go(负数)`的时候会把不用的页面从Stack中移除

🎓`replace`会更新Stack中当前页面

🎉回退到之前页面的时候有activated钩子函数触发

🚀支持浏览器的后退，前进事件

🐰提供路由方向的变化，并且可以在前进和后退的时候添加不同的动画

---

### router-view和router-link的区别

router-view是页面组件加载,router-link是跳转页面

`<router-link>`标签

```vue
<template>
  <nav>
    <router-link to="/about">About</router-link>   // 自定义跳转页面
  </nav>
<template/>
```

views中的.vue文件调用其他组件, 需要import组件，然后添加到components中

```vue
<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
export default {
  components: {
    HelloWorld,
  },
};
</script>
```

## active-class

active-class是vue-router模块的router-link组件中的属性，用来做选中样式的切换；

```vue
<router-link to="/home" active-class="selected">首页<router-link/>
```

