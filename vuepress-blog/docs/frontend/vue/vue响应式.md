# VUE响应式原理

   vue其核心原理就是其数据的响应式，讲到Vue的响应式原理，我们可以从它的兼容性说起，Vue不支持IE8以下版本的浏览器，因为Vue是基于Object.defineProperty的 **getter/setter** 对收集的依赖项进行监听,在属性被访问和修改时通知变化,进而更新视图数据；

![](https://upload-images.jianshu.io/upload_images/7902592-d53bf1ca0cb34e0f?imageMogr2/auto-orient/strip|imageView2/2/w/800/format/webp)

二、响应式数据

1、在实例前声明

```js

var vm = new Vue({
  data: {
 	name: "failte"
  }
})
```



2、在实例后添加

vm.name = "failte"

由于data中没有该属性，因此实例后，此时的name是非响应式的，name变化时，不会更新视图

若需要转换为响应式数据，需要使用 Vue.set() 方法手动添加为响应式属性

Vue.set(vm.data, "name", "ajacci")