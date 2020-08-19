# javascript异步

## 1.promise

## 2.async/await

**async和await是一起使用的**,async开头的函数为异步函数,函数内使用await等待异步队列任务执行完才进行下一步

```js
async function test(){
    const response = await axios.get(url)
    return await response.json() 
}

test().then(res=>{
    console.log(res)
})
```

### 异步串行

```js
  

```

### **异步并行**

```js
asycn function getInfo(name){
    const aPromise =  getInfo('a')
    const bPromise =  getInfo('b')
    //先拿到结果,再来await
    const a = await aPromise
    const b = await bPromise 
    console.log(a)
    console.log(b)
}

```



async/await 结合 Promise.all

异步并行,等待结果,代码运行更快

```js
asycn function getInfo(name){
    const response = await fetch(name)
    return response.json()
}
const showInfo = async () =>{
    const [res_a,res_b] = await Promise.all([//promise.all返回的结果还是一个promise
        getInfo('a'),
        getInfo('b')
    ])
    console.log(res_a)
    console.log(res_b)
}
showInfo()
```

await 后面接一个 promise,如果没有promise,隐式转换为promise

```js
await 123  
等价
await Promise.resolve(123)
```

await后面可以接支持promise库的,.then的方法的

```js
async function main(){
    console.log('waiting...');
    await bluebird.delay(2000);
    console.log(done!);
}
```

### 在循环中使用await