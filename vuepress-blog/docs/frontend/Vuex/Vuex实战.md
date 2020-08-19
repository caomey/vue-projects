# Vuex实战

## state和mutation

1. mutaition中的方法互相调用使用this.commit
2. 多个module 设置namespaced: true

```js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tags: [],
    bills: [],
    currentAmount: "0",
    notes: "",
    selectedTags: "",
    types: "-",
  },
  mutations: {
    initTags(state) {
      if (localStorage.getItem("tags") === null) {
        state.tags = ["吃饭", "购物", "打车", "游戏充值", "工资", "兼职"];
        this.commit("saveTags");
      } else {
        this.commit("fetchTags");
      }
      // state.selectedTags = this.tags[0];
    },
    // 持久化
    fetchTags(state) {
      state.tags = JSON.parse(localStorage.getItem("tags"));
    },
    saveTags(state) {
      localStorage.setItem("tags", JSON.stringify(state.tags));
    },
    // 增删改查
    addTags(state) {
      let tag = prompt("请输入标签");
      if (state.tags.indexOf(tag) >= 0) {
        alert("该标签已存在！");
      } else if (!tag) {
        alert("标签输入为空，请重新输入！");
      } else {
        console.log("新增标签：", tag);
        state.tags.push(tag);
        this.commit("saveTags");
      }
    },
    removeTags(state, tag) {
      console.log("删除标签：", tag);
      state.tags.splice(state.tags.indexOf(tag), 1);
      this.commit("saveTags");
    },
    updateTags(state, tag) {
      let newTag = prompt("请修改标签");
      console.log("修改标签为：", newTag);
      state.tags.splice(state.tags.indexOf(tag), 1, newTag);
      this.commit("saveTags");
    },
    initBills(state) {
      if (localStorage.getItem("bills") !== null) {
        this.commit("fetchBills");
      } else {
        localStorage.setItem("bills", "[]");
      }
    },
    fetchBills(state) {
      state.bills = JSON.parse(localStorage.getItem("bills"));
    },
    saveBills(state) {
      localStorage.setItem("bills", JSON.stringify(state.bills));
    },
    addBills(state, obj) {
      state.bills.push(obj);
      this.commit("saveBills");
      alert("账单创建成功！");
    },
  },
});

```

组件中使用vuex

```js
import { mapState, mapMutations } from "vuex";

 methods: {  // methods中调用mutation方法
    ...mapMutations(["removeBills", "initBills"]),
    selectTags(e) {
      this.$store.state.selectedTags = e.target.innerText;
    },
  removeBills(id) {
      this.bills = this.bills.filter((bills) => bills.id !== id);
      this.$store.commit("saveBills");
      this.initBills();
    },
  },
computed: { //computed 计算state属性
    ...mapState(["tags", "notes"]),
     types: {  //this.types调用,this.types = some 赋值
          set(val) {
            this.$store.state.types = val;
          },
          get() {
            return this.$store.state.types;
          },
        },
      bills: {
          set(val) {
            this.$store.state.bills = val;
          },
          get() {
            return this.$store.state.bills;
          },
  },
 created() {
    this.initTags();
  },
```



## action

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意**异步**操作。

```js
state: {
    count: 0
  },
mutations: {
    increment (state) {
      state.count++
    }
  },
actions: {
  increment ({ commit }) {
    commit('increment')
  }
}
```

也是在methods中调用action

```js
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

## Getter

```js
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

在computed中调用Getter

```js
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
     ...mapGetters({
      // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
      doneCount: 'doneTodosCount'
})
  }
}

```

## Module

多个module调用

```js
import {mapActions,mapState} from 'vuex'  // 引入mapActions,mapState方法
import state from '../vuex/mudule_A/index'  //引入vuex中不同module中的state
methods:{
    ...mapActions("module_A",["someaction"]) //在前面加上对应的module名称即可(vuex中文件夹的名称)
    ...mapMutation("module_A",["somemutation"])
    ...mapState("module_A",["somestate"])
}
beforeCreate(){
    //异步加载state数据
    !this.$store.hasModule("module_A") && this.$store.registerModule("module_A",state)
}
```

项目结构

Vuex 并不限制你的代码结构。但是，它规定了一些需要遵守的规则：

1. 应用层级的状态应该集中到单个 store 对象中。
2. 提交 **mutation** 是更改状态的**唯一方法**，并且这个过程是同步的。
3. 异步逻辑都应该封装到 **action** 里面。

```sh
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

