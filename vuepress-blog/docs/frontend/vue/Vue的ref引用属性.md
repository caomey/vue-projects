# ref

有时候我们也要获取dom元素的需求，我们可以用vue的ref引用属性；

例：

```html
<div ref="hello" @click="fun">hello</div>
methods：{
 fun:function(){
	console.log(this.$refs.hello);    //这里返回的的这个div的元素标签节点，
	console.log(this.$refs.hello.innerHTML); //这里返回的的这个div的元素标签节点里面的内容，
 }
}
```

如果ref属性定义在一个组件上，那么它返回的是这个组件的**实例引用**，这样可以获取到组件里面定义的数据，甚至其他的

方法

```html
<rol ref="one">hell</rol>
console.log(this.$refs.one.$el);   //获取到子组件的模板标签元素
console.log(this.$refs.one);   返回的是这个组件的实例引用
```

