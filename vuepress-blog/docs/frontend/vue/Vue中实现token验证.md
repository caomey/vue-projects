# Vue中实现token验证



### 前后端流程分析

1. 前端页面进行登录操作，将用户名和密码发给服务器
2. 服务器进行校验，通过后生成token，包含信息有密匙、uid、过期时间等，然后返回给前端
3. 前端将token保存在本地（建议在localStorage中）和state（vuex）中，下次对服务器请求时带上，然后返回给前端
4. 服务器端对接收到的token进行校验。通过则进行相应的增删改查操作，并将数据返回给前端；未通过则返回错误码，提示错误信息，然后跳转到登录页

[回到顶部](https://www.cnblogs.com/chenwenhao/p/10466774.html#_labelTop)

### 具体实现

技术栈：vuex + axios + localStorage + vue-router

- 登录路由添加自定义meta字段，来记录该页面是否需要身份验证

```
复制// router.js
{
    path: "/index",
    name: "index",
    component: resolve => require(['./index.vue'], resolve),
    meta: { 
        requiresAuth: true 
    }
} 
```

- 设置路由拦截

```
复制router.beforeEach((to, from, next) => {
    //  matched的数组中包含$route对象的检查元字段
    //  arr.some() 表示判断该数组是否有元素符合相应的条件, 返回布尔值
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // 判断当前是否有登录的权限
        if (!auth.loggedIn()) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next() // 确保一定要调用 next()
    }
})
```

- 设置请求/响应拦截
  在后面的所有请求中都将携带token进行。
  利用axios中的请求拦截器, 通过配置http response inteceptor, 当后端接口返回401 (未授权), 让用户重新执行登录操作。

```
复制// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `token ${store.state.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
});
```

- 登录页面：

```
复制//login.vue
methods: {
  login(){
      if (this.token) {
          // 存储在本地的localStograge中，可以使用cookies/local/sessionStograge
          this.$store.commit(types.LOGIN, this.token)
          // 跳转至其他页面
          let redirect = decodeURIComponent(this.$route.query.redirect || '/');
          this.$router.push({
              path: redirect
          })
      }
  }
}
```

- vuex设置

```
复制import Vuex from 'vuex';
import Vue from 'vue';
import * as types from './types'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: {},
        token: null,
        title: ''
    },
    mutations: {
        // 登录成功将, token保存在localStorage中
        [types.LOGIN]: (state, data) => {
            localStorage.token = data;
            state.token = data;
        },
        // 退出登录将, token清空
        [types.LOGOUT]: (state) => {
            localStorage.removeItem('token');
            state.token = null
        }
    }
});
```

三者区别：

- sessionStorage 不能跨页面共享的，关闭窗口即被清除
- localStorage 可以同域共享，并且是持久化存储的
- 在 local / session storage 的 tokens，就不能从不同的域名中读取,甚至是子域名也不行.
  解决办法使用Cookie.demo: 假设当用户通过 app.yourdomain.com 上面的验证时你生成一个 token 并且作为一个 cookie 保存到 .yourdomain.com,然后，在 youromdain.com 中你可以检查这个 cookie 是不是已经存在了，并且如果存在的话就转到 app.youromdain.com去。这个 token 将会对程序的子域名以及之后通常的流程都有效（直到这个 token 超过有效期） 只是利用cookie的特性进行存储而非验证.