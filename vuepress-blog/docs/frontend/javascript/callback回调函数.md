# 回调函数callback

> 将对象作为参数传递给函数，可以将其他的功能传递作为参数并在以下位置执行

例子

```js
let x=function(){
console.log("i am called from inside a function")};

let y=function(callback){
console.log(' do something')
callback()};
    
y(x); // 将函数x作为参数传递给函数y
```

例子2

```js
let calc = function(a, b, callback){
    return callback(a,b)
}
console.log(calc(1, 2, function(a,b){return a+b}))

```

例子3 sort的回调函数

```js
var myArr =[{
	num:5, str:' apple'
},{
	num:7, str:' cabbage'
},{
	num:1, str:' ban'
}]; 

myArr.sort(function(val1, val2){
if(val1.str > val2. str){
	return -1;
} else{
	return 1;}
});
/*如果想按照其他标准进行排序，就需要提供比较函数，该函数要比较两个值，然后返回一个用于说明这两个值的相对顺序的数字。比较函数应该具有两个参数 a 和 b，其返回值如下：

    若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。
    若 a 等于 b，则返回 0。
    若 a 大于 b，则返回一个大于 0 的值。*/

console.log(myArr)
```





