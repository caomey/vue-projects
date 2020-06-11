# VueRouter

views中放视图层，路由url指向视图层， url可以redirect重定向为其他url

```js
const routes = [
  {
    path: '/',
    redirect: '/home'  // redirect重定向，根目录跳转/home页面
  },
  {
    path: '/home',
    component: Home   // home页面调用组件Home
  },]
```

> 一般在#app中用router-view， 在组件中用router-link

`<router-view/>`标签

```vue
<template>
  <div id="app">
    <router-view></router-view>  // 根据路由跳转页面
  </div>
<template/>
```

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

