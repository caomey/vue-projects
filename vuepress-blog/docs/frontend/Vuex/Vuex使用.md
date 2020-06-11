# Vuex的使用

[官方文档](https://vuex.vuejs.org/zh/)

使用全局状态管理，可以让所有组件和vuex通信，避免了父子组件之间的复杂通信

## 1.安装

```bash
npm i vuex -S
```

## 2.初始化store

```js
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {},
  mutations: {},
});
export default store;
```

## 3. 在main.js中注册store

```js
import Vue from "vue";
import App from "./App.vue";
import store from "./store/store.js";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store,
}).$mount("#app");

```

## 4. 使用

```js
let count = this.$store.state.count
```



### 项目结构

```bash
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```

## mutation

可以通过 `store.state` 来获取状态对象，以及通过 `store.commit` 方法触发状态变更

```js
import Vue from 'vue'
import Vuex from 'vuex'

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

store.commit('increment') // 调用mutations中的increment函数
```

mutation中的函数默认第一个参数是**state**！！！，mutation中函数调用this.commit('func')



## mapMutations

> 放在methods里面，可以调用store里面的mutation方法

```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

## mapState

> 放在computed里面可以双向绑定store里面的state状态

main.js根实例中注册 `store` 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 `this.$store` 访问到，就不需要频繁导入store了

```js
this.$store.state.count
computed: {
    ...mapState(["tags"]), //取出this.$store.state中的tags
},
```

但是这些state中的状态还是需要一个个声明，而且很长，可以用mapstore来访问状态

mapState中的状态修改必须要有mutation中的方法，也可以直接用this.$store.state来修改

bug：Computed property "XXX" was assigned to but it has no setter

1. 组件中v-model=“XXX”，而XXX是vuex state中的某个变量
2. vuex中是单项流，v-model是vue中的双向绑定，但是在computed中只通过get获取参数值，没有set无法改变参数值

```js
computed: {
    ...mapState(["tags", "notes"]),
    notes: {
      get() {
        return this.$store.state.notes;
      },
      set(val) {
        this.$store.state.notes = val;
      },
    },
}
```



## getter

## mapgetter

## action

Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。

## mapaction

## module

Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块