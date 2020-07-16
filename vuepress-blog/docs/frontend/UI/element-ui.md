## element UI -- 默认样式修改不成功的问题

### 方法一：去掉scoped 

原因：scoped 

解决方法：去掉scoped 

去掉scoped，因为scoped会把样式局限在当前页面

应急使用，但是会污染全局样式

### 方法二：给需要修改样式的标签增加class

```css
<el-form-item class="demo">
    <el-input v-model="name"></el-input>
        </el-form-item>
<style>
.demo /deep/ .el-form-item__label{
    //重新定义的CSS属性    
    }    
</style>
```



### 方法三:在modules里面修改 index.css

想改啥就在index.css中Ctrl+F,找到元素类名修改就好了

简单又粗暴。当然还有其他方法，这样的坏处是会修改全局的样式。

---

## vue elementUI 表单校验（数组多层嵌套）

在使用vue element-ui form表单渲染的时候，会遇到这样的数据结构：

```
{
"title":''123455,
"email":'123456@qq.com',
"list": [
            {
                "id": "quis consequat culpa ut pariatur",
                "name": "et quis irure dolore ullamco",
                "ompany": "sunt mollit",
                "address": "anim reprehenderit aliquip labore velit"
            },
            {
                "id": "",
                "name": "laborum magna",
                "company": "mollit esse ipsum quis",
                "address": "cillum dolore ex ut"
            },
        ]
}
```

在遇到某个字段值比如list是个数组，下面多个字段值还需要继续使用rules校验时候，直接给list下面的字段绑定prop="对应的字段值"，是不能校验成功的，解决办法有二：

1、在是数组的地方再套一个`<el-form :model="当前子对象" v-for="遍历list这个数组"></el-form>`

  给list数组下的字段直接还是绑定prop名称为原本的名称就可以；

示例代码如下

```html
<el-form :model="item" v-for="(item,index) in dataFields.list :key="index">
   <el-form-item label="name" prop="name" :rules="{ required: true, message: 'Required', trigger: 'blur' }">
      <el-input placeholder="name" v-model="item.name"></el-input>
   </el-form-item>
</el-form>
```

2、直接给list数组下对象的字段名称绑定为  **数组下的名称**

示例代码如下：

```html
<div v-for="(item,index) in dataFields.list :key="index">
    <el-form-item label="name" :prop="`list[${index}].name`" :rules="{ required: true, message: 'Required', trigger: 'blur' }">
       <el-input placeholder="name" v-model="item.name"></el-input>
   </el-form-item>
</div>
```

这里list即为上面对象中的数组，datafields是最外层对象。