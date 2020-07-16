# vue 实战

## 项目创建

1.  初始化项目

   ```bash
   vue create .
   ```


## 引入子组件

1. 子组件导出

```js
export default {
 name: 'HomeHeader'
}
```

2. 引入子组件

   ```js
   import HomeHeader from "./HomeHeader.vue";
   
   export default {
     name: 'home',
     components: {
       HomeHeader
     }
   }
   ```

3. 调用子组件

   ```html
   <home-header></home-header>
   ```

   

## 引用全局css

```html
// script中 引入
<script>
    import "./assets/base.css";
</script>
// style中 引入
<style lang="stylus">
	@import './style/main'
</style>
```

## props父组件子组件传值

```css
// 父组件中, 关键在于要v-bind绑定传入的值
<memoArticle v-for="item in memos" :memo="item" :key="item.id"></memoArticle>

// 子组件中
props["memo"]

```

## $emit 子组件向父组件传值

```html
//父组件监听@showbox(监听变量必须全部小写), 注意监听的对象必须是该子组件
<memo-nav @showbox="toshow"></memo-nav>

//子组件$emit传值到父组件， 名称要对应上
 <div class="nav add" @click="$emit('showbox', true)">新建</div>
```

## 事件绑定

### input

- v-model

```html
<input type="text" v-model="notes" placeholder="请输入备注" />
```

### button

点击事件有个event，可以作为参数传入，console.log(event)就可以查到信息，比如按钮的值，event.target.innerText

```js
    inputContent(e) {
      let content = e.target.innerText;
      console.log(content);
    },
```

## v-for

要绑定key不然报错，key的值重复也会报错，可以用value.index

如果（item, index) in items, 第二个值默认是序号，如果items是字典，第二个值默认是键，

```html
<div v-for="tag in tags" class="item" :key="tag.index"></div>
```

## computed 和 watch的区别

1. computed里面是自定义属性，**不能和data里面的数据重复**，watch监听的属性必须是存在的(data中的，或者computed中的属性)
2. watch 默认两个参数，newval,oldval
3. watch支持异步
```html
<template>
<div id=1"root">
<input type=""name="firstNamel"v-model="firstNamel">
<input type=""name="lastName"v-model="lastName">
<p>{{ fullName }}</p>
<p>{{ count }}</p>
</div>
</template>
<script type="text/javascript">
export default{
data(){ 
    return{
		firstName:'', 
    	lastName:'', 
        count:0,
}, 
computed:{
fullName: function(){
	return this.firstName+''+this.lastName }
}
watch:{
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
}
</script>
```

computed 和 method的区别

**计算属性是基于它们的响应式依赖进行缓存的**，只在相关响应式依赖发生改变时它们才会重新求值

## 生命周期钩子

### beforeCreate

在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。

### created

在实例创建完成后被立即调用在这一步，实例已完成以下的配置：数据观测 (data observer)，property 和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，`$el` property 目前尚不可用。

### beforeMount

在挂载开始之前被调用：相关的 `render` 函数首次被调用

### mounted

实例被挂载后调用，这时 `el` 被新创建的 `vm.$el` 替换了。如果根实例挂载到了一个文档内的元素上，当 `mounted` 被调用时 `vm.$el` 也在文档内。

### beforeUpdate

数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。

### updated

当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用[计算属性](https://cn.vuejs.org/v2/api/#computed)或 [watcher](https://cn.vuejs.org/v2/api/#watch) 取而代之。

### activated

被 keep-alive 缓存的组件激活时调用

### deactivated

被 keep-alive 缓存的组件停用时调用

### beforeDestroy

实例销毁之前调用。在这一步，实例仍然完全可用

### destroyed

实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。