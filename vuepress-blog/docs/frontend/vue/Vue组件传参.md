# Vue组件间的传参(7种)

| 父子组件之间的传参 | 方向   |
| ------------------ | ------ |
| props和$emit       | 双向   |
| $parent和$children | 双向   |
| this.refs          | 下到上 |

| 非子组件之间的传参 | 方向     |
| ------------------ | -------- |
| 事件总线bus        | 任意方向 |
| $attrs和$listeners | 双向     |
| provide和inject    | 上到下   |
| **vuex**           | 任意方向 |



## 1. 兄弟关系数据传递

**利用父组件来处理兄弟组件间的数据传递**

如果希望子**组件A**的数据传递给**B组件**, 那么我们可以先将子组件A的数据通过自定义事件将数据传递给父组件, 然后父组件在通过props将数据传递给B组件, 这样我们就达到了将A组件的数据传递给B组件的目标

```html
<div id="app">
    <!-- 使用组件 -->
    <first-component @addcomment="addComment"></first-component>
    <second-component :comments="comments" @deletecomment="deleteComment"></second-component>

</div>

<!-- 组件模板 -->
<template id="firstComponent">
    <div>
        <input type="text" v-model="comment">
        <button @click="handleClick">点击评论</button>
    </div>
</template>
<template id="secondComponent">
    <ul>
        <li v-for="comment,index in comments" :key="index">
            <span>{{comment}}</span>
            <button @click="deleteClick(index)">X</button>
        </li>
    </ul>
</template>
<script>
    //  组件选项对象
    let firstComponent = {
        template: `#firstComponent`,
        data(){
            return {
                comment: ''
            }
        },
        methods: {
            handleClick(){
                let comment = this.comment.trim();
                if(!comment)return
                this.$emit("addcomment", comment);
                this.comment = ''
            }
        }
    };
    let secondComponent = {
        props:["comments"],
        template: `#secondComponent`,
        methods:{
            deleteClick(index){
                this.$emit("deletecomment",index)
            }
        }
    }

    //  实例中注册组件
    const vm = new Vue({
        el:"#app",
        data:{
            comments: [] 
        },
        components: {
            secondComponent,
            firstComponent,
        },
        methods:{
            addComment(value){
                this.comments.push(value)
            },
            deleteComment(index){
                this.comments.splice(index,1)
            }
        }
    })

</script>
```

## 2. 发布订阅模式 this.bus.$emit/this.bus.$on

用于解决平级组件或者跨级组件之间的通信,因为如果全部用父子组件通信,有的不是父子组件就很繁琐,所以我们利用一个公共的vue实例订阅和发布事件来达到不是父子组件间的通信

利用`$emit()`方法触发自定义事件 和 `$on()` 监听自定义事件,给自定义事件添加事件处理函数

在Vue的原型上定义一个变量bus,在所有的组件里都可以这个变量，使用`this.bus.$emit()`发布消息，`this.bus.$on`订阅消息

```html
<div id="app">
    <!-- 使用组件 -->
    <first-component></first-component>
    <second-component></second-component>

</div>
<!-- 组件模板 -->
<template id="firstComponent">
    <div>
        <input type="text" v-model="comment">
        <button @click="handleClick">点击评论</button>
    </div>
</template>
<template id="secondComponent">
    <ul>
        <li v-for="comment,index in comments" :key="index">
            <span>{{comment}}</span>
            <button @click="deleteClick(index)">X</button>
        </li>
    </ul>
</template>

<script>
    // 将作为总线的vue实例绑定到构造函数上
    Vue.prototype.bus = new Vue(); //!!!!!!!重点

    //  组件选项对象
    // 组件一
    let firstComponent = {
        template: `#firstComponent`,
        data(){
            return {
                comment: ''
            }
        },
        methods: {
            handleClick(){
                let comment = this.comment.trim();
                if(!comment)return
                this.bus.$emit("addcomment",comment)
                this.comment = ""
            }
        }
    };

    // 组件二
    let secondComponent = {
        template: `#secondComponent`,
        data(){
            return {
                comments: [] 
            }
        },
        // 创建组件的时候,监听自定义事件
        // 注意函数中的this
        created(){
            this.bus.$on("addcomment", (comment) =>{
                this.comments.push(comment)
            })
        },
        methods:{
            deleteClick(index){
                this.comments.splice(index,1)
            }
        }
    }

    //  实例中注册组件
    const vm = new Vue({
        el:"#app",
        components: {
            secondComponent,
            firstComponent,
        }
    })

</script>
```

除了以上`$on`监听事件外, 还有两个处理事件的方法:`$once`和`$off`.

`$once`的行为与`$on`一样, 只不过是绑定的事件监听器只会执行一次, 在事件第一次触发完毕后会自动解除事件绑定

`$off` 方法则是用于移出一个事件监听器.

## 3. ref在组件上使用(利用ref处理父子通信)

通过ref,我们就可以实现在父组件中调用子组件的方法

```html
<div id="app">
    <loading ref="load"></loading>
</div>

<template id="myalert">
    <div>
        <h2 v-show="flag">加载中...</h2>
    </div>
</template>

<script>
    const loading = {
        data() {
            return { flag: true }
        },
        template: '#myalert',
        methods: {
            hide() {
                this.flag = false;
            }
        }
    };

    var vm = new Vue({   // 根实例
        el: '#app',
        data: {
        },
        components: {
            loading
        },
        mounted() {
            // console.log(this.$refs.load)
            setTimeout(() => {
                this.$refs.load.hide()
            }, 2000)
        }
    });
</script>
```

## 4.$listeners 和 $attrs

```html
			父组件

<A>
    <B :a="a" @test="test"></B>
</A>
data:{
	a:111
}
test(val){ //孙组件传上来的方法
	console.log(val)
}
			子组件

<B> 
    //中间层,attrs从上往下传参数,从下往上传事件
    <C v-bind="$attrs" v-on="$listeners"></C>
</B>

			孙组件
<C>
</C>
console.log(a) //父组件传下来的值
props:[a]
this.$emit('test',123)
```



## 5.provide 和 inject



## 6.props/$emit

父组件向子组件传参

```js
父组件中的children子组件
<children :form-data="test"/>
```

: 等价v-bind:, from-data 为子组件中绑定的参数,test为父组件中传入的参数,

form-data等价 formData 或者 formdata 不区分大小写

```js
:子组件参数/方法=传入的父组件参数/方法
```

## 7.$parent/$children

## 8.Vuex

