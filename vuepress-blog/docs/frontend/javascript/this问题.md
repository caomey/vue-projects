# this问题

## 1.无法使用this

```js
let _this = this,
//
```

## this赋值给局部变量

**利用变量保存this的之前的指向**

```js
tab.prototype.init=function(){
            for(var i=0,len=this.span.length;i<len;i++){
                var that=this;
                that.span[i].index=i;
                that.span[i].onclick=function(){
                   that.show(this.index);
               }
            }
            this.show(1);
        }
```



