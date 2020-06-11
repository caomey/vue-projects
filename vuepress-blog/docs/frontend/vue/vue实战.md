# vue 实战

## 项目创建

1.  初始化项目

   ```bash
   vue create .
   ```

2. 

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
fullName: function(newval, oldval){
this. count++}
}
</script>
```



