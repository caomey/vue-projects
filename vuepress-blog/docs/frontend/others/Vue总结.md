# Vue学习总结



## .vue页面中布局

单个view视图层中放入大量的属性和方法,容易造成阅读困难,可读性较差,尽量减少页面中大量出现的属性,通用方法,这样关注度可以集中在主业务逻辑上,避免重复代码

1.大量常量,单独放在一个.js文件中

```js
const COMMON_VALUES = {
    addr:"abc",
    type:"01",
    status:"100",
    name:"aaa", 
} 
export {
	COMMON_VALUES
}
```

2.个组件中公用的方法,单独放在一个js文件中

```js
function excelExport(data,fileName){
    const link = document.createElement('a')
    link.download = `${filename}${dataForm(new Date())}.xlsx`
}
function dataForm(date){
    
}
export default excelExport;
```

3.组件内重复代码,封装成方法,作为回调函数使用

```js
methods:{
    onClick(record){
        if(status == '01'){
           this.submitDate(record,result)
           }
		else if(status == '02'){
           this.submitDate(record,result)
        }
       	else if(status == '03'){
           this.submitDate(record,result)
        }
    },
    submitDate(record,result){
        dosomething
    }
}
```

4.备注和命名

主逻辑方法名上备注功能模块,增强可读性,事件命名使用on开头,方便自己区分,回调函数使用get,set,change等开头,

事件和回调函数分为上下两部分,主要关注度放在事件上

```js
methods:{
    //..点击事件
    onClick(){},
    //..取消事件
	onCancel(){},
    //..保存事件
    onSubmit(){},
    //获得表单数据
	getDateList(){},
    //更改表单数据
   	changeDate(){}     
}
```

5.使用mixins混入模式

当某个功能模块既包含属性,又有很多方法的时候,使用mixins,关注度分离,mixins的js文件中的结构,和.vue中结构,一样可以有import,data(),methods,生命周期函数

mixins中.js文件

```js
import XLSX from 'xlsx'  //导入
export default {
    data(){
        return {
            info:1234
        }
    },
    mounted(){},
    methods(){},
    
}
```

在.vue视图层混入mixins文件

```js
import bondInfo from '@/mixins/bond/info.js'
import repoInfo from '@/mixins/repo/info.js'
export default {
    mixins:[bondInfo,repoInfo]
}
```

6.组件封装

当多个页面,使用同个模块时,可以将这个模块封装成组件

```js
import CommonTable from '@/components/Commontable.js'
export default {
    components:{ 
        CommonTable,//使用多个相同组件,@事件,绑定不同的自定义方法名,就不会冲突了
    }
}
```

当组件在两种业务逻辑下,有部分差异,需要复杂判断时,不如分成两个组件,降低耦合

## Vue中mock模拟数据

除了传统的mock.mock模拟数据,还可以将后台返回的数据暂时保存到js中,或者根据swagger文档中的字段手动造一些数据,,先完成前端功能

打开调试工具=>选择返回对象=>右键store as global varialble=>在console中出现temp变量=>copy(temp1)复制到粘贴板 => 粘贴到Mock.js文件中 

在接口返回数据失败时调用mock数据

```js
import {Mock} from './Mock.js'

axios.get(url,params).then(res=>{
    if(res.data.data){}else{
        this.getDate(Mock) //无数据时,返回模拟数据
    }
})
```

## Vue中使用default默认值

在不传参时也不会报错,需要传参是传入参数即可

方法入参使用默认值

```js
getDate(params={}){} //在入参时给个默认值,不传参时使用默认值
```

props中使用默认值

```js
props:{
   Info:Object,
   default:()=>{
       return {}
   }
}
```

## Vue中的同步和异步

javascript是单线程非阻塞的,当同一状态在一个执行栈中赋值时无法监听变化,这时可以使用异步**任务队列**宏任务定时器setTimeout

```js
var isShow = false //记录弹窗状态
methods:{
    onClick(){
        this.isShow = false //先初始化关闭弹窗
        setTimeout(()=>{
            this.isShow = true //满足条件打开弹窗
        },0)
    }
}
```

## Vue中使用 && 和 ||

减少报错

1. && 只要有一个错的就是错的

2. || 只要有一个对的就是对的