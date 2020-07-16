#### 1. DOM选择器

a. getElement系列

| 属性  | 选择器                                        |
| ----- | --------------------------------------------- |
| id    | document.getElementById("eId")                |
| name  | document.getElementsByName("eName")           |
| class | document.getElementsByClassName("eClassName") |
| 标签  | document.getElementsByTagName("eTagName")     |

b. querySelector系列

| 返回                       | 选择器                                 |
| -------------------------- | -------------------------------------- |
| 返回一个（第一个）匹配对象 | document.querySelector(cssselecter)    |
| 返回匹配对象数组           | document.querySelectorAll(cssselecter) |

c. 宿主对象

| 属性                                 | 选择器                   |
| ------------------------------------ | ------------------------ |
| 获取页面中的HTML标签                 | document.documentElement |
| 获取页面中的BODY标签                 | document.body            |
| 获取页面中的所有元素节点的对象集合型 | document.all['']         |

d. JQ 选择器原理



```jsx
function $(selector, context) {
  context = context || document;
  var elements = context.querySelectorAll(selector); //实际上就是 querySelectorAll 的使用
  return Array.prototype.slice.call(elements);
}
```

#### 2. 创建DOM节点

| 作用             | 函数                                |
| ---------------- | ----------------------------------- |
| 创建新的元素节点 | document.createElement('元素名')    |
| 创建新的属性节点 | document.createAttribute('属性名')  |
| 创建新的文本节点 | document.createTextNode('文本内容') |
| 创建新的注释节点 | document.createComment('注释节点')  |
| 创建文档片段节点 | document.createDocumentFragment('') |

#### 3. 添加DOM节点

| 作用                                   | 函数                                                  |
| -------------------------------------- | ----------------------------------------------------- |
| 向父节点的最后一个子节点后追加新节点   | parent.appendChild( element/txt/comment/fragment )    |
| 向父节点的某个特定子节点之前插入新节点 | parent.insertBefore( newChild, existingChild )        |
| 给元素增加属性节点                     | element.setAttributeNode( attributeName )             |
| 给元素增加指定属性，并设定属性值       | element.setAttribute( attributeName, attributeValue ) |

#### 4. 删除DOM节点

| 作用                                 | 函数                                    |
| ------------------------------------ | --------------------------------------- |
| 删除已有的子节点，返回值为删除节点   | parentNode.removeChild( existingChild ) |
| 删除具有指定属性名称的属性，无返回值 | element.removeAttribute('属性名')       |
| 删除指定属性，返回值为删除的属性     | element.removeAttributeNode( attrNode ) |

#### 5. 修改DOM节点

| 作用                                               | 函数                                                  |
| -------------------------------------------------- | ----------------------------------------------------- |
| 用新节点替换父节点中已有的子节点                   | parentNode.replaceChild( newChild, existingChild )    |
| 若原元素已有该节点，此操作能达到修改该属性值的目的 | element.setAttributeNode( attributeName )             |
| 若原元素已有该节点，此操作能达到修改该属性值的目的 | element.setAttribute( attributeName, attributeValue ) |

#### 6. 数组操作

| 方法                                                         | 描述                                                         | 是否改变原数组 |
| ------------------------------------------------------------ | ------------------------------------------------------------ | -------------- |
| [concat()](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fjsref_concat_array.asp) | 连接两个或更多的数组，并返回结果。                           | 否             |
| [join()](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fjsref_join.asp) | 把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。 | 否             |
| [pop()](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fjsref_pop.asp) | 删除并返回数组的最后一个元素                                 | 否             |
| [push()](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fjsref_push.asp) | 向数组的末尾添加一个或更多元素，并返回新的长度。             | **是**         |
| [reverse()](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fjsref_reverse.asp) | 颠倒数组中元素的顺序。                                       | **是**         |
| [shift()](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fjsref_shift.asp) | 删除并返回数组的第一个元素                                   | **是**         |
| [slice()](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fjsref_slice_array.asp) | 从某个已有的数组返回选定的元素                               | 否             |
| [sort()](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fjsref_sort.asp) | 对数组的元素进行排序                                         | **是**         |
| [splice()](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fjsref_splice.asp) | 删除元素，并向数组添加新元素。                               | **是**         |
| [toSource()](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fjsref_tosource_array.asp) | 返回该对象的源代码。                                         | 否             |
| [toString()](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fjsref_toString_array.asp) | 把数组转换为字符串，并返回结果。                             | 否             |
| [toLocaleString()](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fjsref_toLocaleString_array.asp) | 把数组转换为本地数组，并返回结果。                           | 否             |
| [unshift()](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fjsref_unshift.asp) | 向数组的开头添加一个或更多元素，并返回新的长度。             | **是**         |
| [valueOf()](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fjsref_valueof_array.asp) | 返回数组对象的原始值                                         | 否             |

#### 7. Object 对象操作

| 方法                                                         | 描述                                               |
| ------------------------------------------------------------ | -------------------------------------------------- |
| [element.appendChild()](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fmet_node_appendchild.asp) | 向元素添加新的子节点，作为最后一个子节点。         |
| [element.attributes](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fprop_node_attributes.asp) | 返回元素属性的 NamedNodeMap。                      |
| [element.childNodes](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fprop_node_childnodes.asp) | 返回元素子节点的 NodeList。                        |
| [element.className](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fprop_html_classname.asp) | 设置或返回元素的 class 属性。                      |
| element.clientHeight                                         | 返回元素的可见高度。                               |
| element.clientWidth                                          | 返回元素的可见宽度。                               |
| [element.cloneNode()](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fmet_node_clonenode.asp) | 克隆元素。                                         |
| [element.firstChild](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fprop_node_firstchild.asp) 返回元素的首个子。 |                                                    |
| [element.getAttribute()](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fmet_element_getattribute.asp) | 返回元素节点的指定属性值。                         |
| [element.getAttributeNode()](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fmet_element_getattributenode.asp) | 返回指定的属性节点。                               |
| [element.hasAttribute()](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fmet_element_hasattribute.asp) | 如果元素拥有指定属性，则返回true，否则返回 false。 |
| [element.hasAttributes()](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fmet_node_hasattributes.asp) | 如果元素拥有属性，则返回 true，否则返回 false。    |
| [element.hasChildNodes()](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fmet_node_haschildnodes.asp) | 如果元素拥有子节点，则返回 true，否则 false。      |
| [element.id](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fprop_html_id.asp) | 设置或返回元素的 id。                              |
| [element.innerHTML](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fprop_html_innerhtml.asp) | 设置或返回元素的内容。                             |
| [element.insertBefore()](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fmet_node_insertbefore.asp) | 在指定的已有的子节点之前插入新节点。               |
| [element.lang](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fprop_html_lang.asp) | 设置或返回元素的语言代码。                         |
| [element.lastChild](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fprop_node_lastchild.asp) | 返回元素的最后一个子元素。                         |
| [element.nextSibling](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fprop_node_nextsibling.asp) | 返回位于相同节点树层级的下一个节点。               |
| [element.nodeName](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fprop_node_nodename.asp) | 返回元素的名称。                                   |
| [element.nodeType](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fprop_node_nodetype.asp) | 返回元素的节点类型。                               |
| [element.nodeValue](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fprop_node_nodevalue.asp) | 设置或返回元素值。                                 |
| [element.normalize()](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fmet_node_normalize.asp) | 合并元素中相邻的文本节点，并移除空的文本节点。     |
| element.offsetHeight                                         | 返回元素的高度。                                   |
| element.offsetWidth                                          | 返回元素的宽度。                                   |
| element.offsetLeft                                           | 返回元素的水平偏移位置。                           |
| element.offsetParent                                         | 返回元素的偏移容器。                               |
| element.offsetTop                                            | 返回元素的垂直偏移位置。                           |
| [element.parentNode](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fprop_node_parentnode.asp) | 返回元素的父节点。                                 |
| [element.previousSibling](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fprop_node_previoussibling.asp) | 返回位于相同节点树层级的前一个元素。               |
| [element.replaceChild()](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fmet_node_replacechild.asp) | 替换元素中的子节点。                               |
| element.scrollHeight                                         | 返回元素的整体高度。                               |
| element.scrollLeft                                           | 返回元素左边缘与视图之间的距离。                   |
| element.scrollTop                                            | 返回元素上边缘与视图之间的距离。                   |
| element.scrollWidth                                          | 返回元素的整体宽度。                               |
| [element.setAttribute()](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fmet_element_setattribute.asp) | 把指定属性设置或更改为指定值。                     |
| [element.setAttributeNode()](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fmet_element_setattributenode.asp) | 设置或更改指定属性节点。                           |
| element.setUserData()                                        | 把对象关联到元素上的键。                           |
| element.style                                                | 设置或返回元素的 style 属性。                      |
| [element.tabIndex](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fprop_html_tabindex.asp) | 设置或返回元素的 tab 键控制次序。                  |
| [element.tagName](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fprop_element_tagname.asp) | 返回元素的标签名。                                 |
| [element.textContent](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fprop_node_textcontent.asp) | 设置或返回节点及其后代的文本内容。                 |
| [element.title](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fprop_html_title.asp) | 设置或返回元素的 title 属性。                      |
| element.toString()                                           | 把元素转换为字符串。                               |
| [nodelist.item()](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fmet_nodelist_item.asp) | 返回 NodeList 中位于指定下标的节点。               |
| [nodelist.length](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fjsref%2Fprop_nodelist_length.asp) | 返回 NodeList 中的节点数。                         |

#### 8. 回收机制

在JS里面如果一个对象不被引用，那么这个对象就会被GC回收；在JS里面存在两种作用域：全局作用域和函数作用域；全局变量声明之后，它的生命周期会一直存在，直到全局作用域被销毁，例如浏览器退出、系统关闭等。new出来的对象如果是存在与全局作用域下，只有等全局作用域被销毁，对象才能被销毁。函数声明之后，等函数被调用了，系统会创建一个执行上下文，开辟一个新的内存区去运行函数，当函数执行完毕之后该区域会被回收，new出来的对象处于函数作用域内，对象会随着函数执行完毕，而被回收内存，销毁。函数作用域里面new出来的对象，被外部变量所引用了（出现闭包时候），只有等外部变量不在引用函数作用域内的new出来的对象变量（即外部变量不在使用），new出来的对象会被销毁。

#### 9. 获取input图片的url

用于实现选择上传图片后预览功能



```jsx
var createObjectURL = function(blob){
  return window[window.webkitURL ? 'webkitURL' : 'URL']['createObjectURL'](blob);
};

//传入 el.files[];
```

#### 10. 关于循环

我们拥有各式各样的循环写法，这里将讲解一下每种写法的特点。我是将循环分成三类的，一个单纯的次数循环，只针对循环条件做循环。第二个是针对数组类循环，对值与index有要求的。第三个则是针对 json 类循环，对key和value有要求。

**a. 次数类**
 个人认为在做状态判断循环或者固定循环次数时比较适合，就是重复运行的时候。

```dart
//while循环
var num = 1;  //  1、声明循环变量
while (num<=10){  //  2、判断循环条件;
    document.write(num+"<br />");  //  3、执行循环体操作；
    num++;  //  4、更新循环变量；
}

//do-while循环
var num = 10;        
do{
    document.write(num+"<br />");//10 9 8 7 6 5 4 3 2 1 0
    num--;
}while(num>=0);
```

**b. 数组类**
 对于数组一般常用的就这个三种方法，按性能排序为：
 **for > forEach > map**
 forEach 类似于 for + i 的语法糖，而 map 则是对数组做映射操作，在并不是非常庞大的数据量时，这两个更利于阅读书写。



```go
//性能最高的循环写法
var arr = [a,b,c,d,e];
for(var i = 0 , len = arr.length; i < len; i++){
    console.log(arr[i]);
}
```

而 forEach 的优势在于对稀疏数组的处理，会跳过数组中的空位；

```jsx
//可以看到他只操作了三次
var arr = new Array(1000);
arr[0] = 1;
arr[99] = 3;
arr[999] = 5;

var count = 0;
arr.forEach(function(value, index , arr) {
    count++;
    console.log(index, value);
});
console.log('count', count);
```

.map 不仅会跳过数组中的空位，同时还具有链式调用的便利性；

```jsx
// toString(16) 转为16进制
let arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
arr.map(i => i * 32).map(i => i.toString(16)).map(i => i.toUpperCase());

arr.map(function(value,index,arr){
    //回调函数
});
```

**c. json类**
 在js中专门是创造 for+in 语句对对象进行循环遍历的



```jsx
var obj = {a:1, b:2, c:3};
    
for (var prop in obj) {    //prop为key
  console.log("obj." + prop + " = " + obj[prop]);
}
```

当然 for+in 是会循环到对象继承的属性的，我们可以利用 hasOwnProperty 来避免这种情况



```jsx
var triangle = {a: 1, b: 2, c: 3};

function ColoredTriangle() {
  this.color = 'red';
}

ColoredTriangle.prototype = triangle;

var obj = new ColoredTriangle();

for (var prop in obj) {
  if (obj.hasOwnProperty(prop)) {
    console.log(`obj.${prop} = ${obj[prop]}`);
  } 
}

// Output:
// "obj.color = red"
```

**d. ES6 for+of**
 在ES6中，js设计者们意识到循环的不便，从而引入了新的语句 for+of ；

> ES6 借鉴 C++、Java、C# 和 Python 语言，引入了for...of循环，作为遍历所有数据结构的统一的方法。一个数据结构只要部署了Symbol.iterator属性，就被视为具有iterator接口，就可以用for...of循环遍历它的成员。也就是说，for...of循环内部调用的是数据结构的Symbol.iterator方法。for...of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。



```jsx
//对于数组
        var arr = ['a', 'b', 'c', 'd'];

        for (let a in arr) {
          console.log(a); // 0 1 2 3
        }
        
        for (let a of arr) {
          console.log(a); // a b c d
        }
```



```csharp
//对于Set 和 Map 结构
var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
        for (var e of engines) {
          console.log(e);
        }
        // Gecko  Trident    Webkit
        
        var es6 = new Map();
        es6.set("edition", 6);
        es6.set("committee", "TC39");
        es6.set("standard", "ECMA-262");
        for (var [name, value] of es6) {
          console.log(name + ": " + value);
        }
        // edition: 6
        // committee: TC39
        // standard: ECMA-262
```



```jsx
//类似数组的对象
        var str = "hello";
        
        for (let s of str) {
          console.log(s); // h e l l o
        }
        
        // DOM NodeList对象
        let paras = document.querySelectorAll("p");
        
        for (let p of paras) {
          p.classList.add("test");
        }
        
        // arguments对象
        function printArgs() {
          for (let x of arguments) {
            console.log(x);
          }
        }
        printArgs('a', 'b');// 'a' 'b'
```

**e. 循环控制语句**
 i. break：跳出本层循环，继续执行循环后面的语句。
 　　　  如果循环有多层，则break只能跳出一层。
 ii. continue：跳过本次循环剩余的代码，继续执行下一次循环。
 　　　①对与for循环，continue之后执行的语句，是循环变量更新语句i++；
 　　　②对于while、do-while循环，continue之后执行的语句，是循环条件判断；
 　　　因此，使用这两个循环时，必须将continue放到i++之后使用，否则，continue将跳过i++进入死循环。

#### 11. JavaScript 数据类型

在 js 中数据类型分为两种，基本数据类型跟引用数据类型。

- 五种基本数据类型

| 种类       | typeof 结果                                          |
| ---------- | ---------------------------------------------------- |
| Number     | Number（NaN 也是数字类型，其判断方法为：isNaN 函数） |
| String     | String                                               |
| Boolean    | Boolean                                              |
| Null       | Object（指向Null对象，判断方法为：object===null？）  |
| undefinded | undefinded                                           |

- 三种引用对象类型

| 种类     | typeof 结果 |
| -------- | ----------- |
| Object   | Object      |
| Array    | Object      |
| Function | function    |

- 如何区分 Object 与 Array

| 序号              | 方法                                                         |
| ----------------- | ------------------------------------------------------------ |
| 1.tostring        | Object.prototype.toString.call(obj) === "[object Array]"     |
| 2.isArray         | Array.isArray(obj) 【ES5实现】                               |
| 3.instanceof      | obj instanceof Array                                         |
| 4.isPrototypeOf() | Array.prototype.isprototypeOf(obj) 【判断其对象是否存在与数组的原型上】 |
| 5.constructor     | obj.constructor == Array 【构造器判断】                      |
| 6.调用Array方法   | obj.length 或者 obj,concat；Object的话会报错                 |

- 两种类型的区别与原理
   这两种数据类型的成因主要是因为存储的方式不同导致的，首先我们要了解什么是堆内存与栈内存。
   栈（stack）为自动分配的内存空间，它由系统自动释放；
   堆（heap）则是动态分配的内存，大小不定也不会自动释放。



```jsx
var a = 10;
var b = a;
b = 20;
console.log(a); // 10值
```

![img](https:////upload-images.jianshu.io/upload_images/5420598-1fdf12a09216e04d.png?imageMogr2/auto-orient/strip|imageView2/2/w/544/format/webp)

基本数据类型的栈复制过程



```jsx
var obj1 = new Object();
var obj2 = obj1;
obj2.name = "I got a name";
console.log(obj1.name); // I got a name
```

![img](https:////upload-images.jianshu.io/upload_images/5420598-ce344feed5d9cdd9.png?imageMogr2/auto-orient/strip|imageView2/2/w/577/format/webp)

引用对象类型堆复制的过程

#### 12. 浅拷贝和深拷贝

上一个小结我们理解了两种数据类型，对于基本类型的数据，是储存于栈内存中的，其复制是最简单的，赋值即可。

```csharp
var a=123;
var b=a;
a=123456;
alert(a); //123456
alert(b); //123

//或者是

var a='test1';
var b=a;
a='test2';
alert(a); //test2
alert(b); /test1
```

而对于引用类型来说，直接赋值只是把指针复制给新的对象而已，本质上没有开辟新的存储空间，比如：

```csharp
var arr1=[1,2,3];
var arr2=arr1;
arr1.push(4);
alert(arr1); //1234
alert(arr2); //1234
arr2.push(5);
alert(arr1); //12345
alert(arr2); //12345
```

针对这种情况我们，一维数组或者对象，我们可以通过以下方法实现深拷贝；

```csharp
var arr = [1,2,3,[1,2]];

var json = {"a":1,"b":2,{"a":2}};

//对于这种复杂的对象不可以用以下方法
```

**数组类**

- 循环

```csharp
var arr1=[1,2,3,4];
var arr2=[];
for(var i=0; i<arr1.length; i++){
  arr2[i]=arr1[i];
}
```

- Array.concat

```csharp
var a = [1,2,5],b=[];
b = [].concat(a);
```

- Array.from(ES6)

```csharp
var arr1=[1,2,3]; 
var arr2=Array.from(arr1);
```

- ...拓展运算符

```csharp
var arr1=[1,2,3];
var arr2=[...arr1];
```

**json类**

- 循环

```csharp
var json1={"name":"Max","age":25,"job":"Coder"};
var json2={};
for(var name in json1){
  json2[name]=json1[name];
}
```

- 转字符串

```jsx
var json1= {"name":"Max","age":25,"job":"Coder"};
var json2= JSON.parse(JSON.stringify(json1));
```

虽然 JSON.stringify 可以对复杂 json 对象进行深拷贝，但是这样对 function() 就没办法拷贝了

**递归深拷贝**

```jsx
//最好的方法就是实现循环赋值，我们主要通过递归的方法
var json1={"name":"Max","age":25,"arr":[1,2,3,4,5]};
var json2;
function copy(obj1,obj2){
  var obj2=obj2||{}; //最初的时候给它一个初始值=它自己或者是一个json
  for(var name in obj1){
    if(typeof obj1[name] === "object"){ //先判断一下obj[name]是不是一个对象
      obj2[name]= (obj1[name].constructor===Array)?[]:{}; //我们让要复制的对象的name项=数组或者是json
      copy(obj1[name],obj2[name]); //然后来无限调用函数自己 递归思想
    }else{
      obj2[name]=obj1[name];  //如果不是对象，直接等于即可，不会发生引用。
    }
  }
  return obj2; //然后在把复制好的对象给return出去
}
json2=copy(json1,json2)
json1.arr.push(6);
console.log(json1.arr);  //123456
console.log(json2.arr);  //12345
```

#### 13. 如何实现继承

- 构造器继承

```jsx
function parent(){
  this.name = 'parent';
};

parent.prototype.say = function(){
   console.log(this.name);
};

function child(){
  parent.call(this);
  this.type = 'child';
};

new child().name //"parent";
new child().say(); //error 缺点原型链上的方法没办法继承
```

- 原型链继承

```php
function parent(){
  this.list = [1,2,3,4];
};

parent.prototype.say = function(){
   console.log(this.list);
};

function child(){
  this.type = 'child';
};

child.prototype = new parent();

var s1 = new child(); 
s1.list.push(5);
var s2 = new child();

s1.say() // [1,2,3,4,5]
s2.say() // [1,2,3,4,5]
// 原型链上中的原型对象它俩是共用的，没有进行隔离
```

- 组合模式继承

```php
function parent(){
  this.list = [1,2,3,4];
};

parent.prototype.say = function(){
   console.log(this.list);
};

function child(){
  parent.call(this);
  this.type = 'child';
};

child.prototype = new parent(); //第一次实例化

var s1 = new child(); //第二次实例化
s1.list.push(5);
var s2 = new child();

s1.say() // [1,2,3,4,5]
s2.say() // [1,2,3,4]
//缺点进行了两次实例化
```

- ES5完美继承

```jsx
function parent(){
  this.list = [1,2,3,4];
};

parent.prototype.say = function(){
   console.log(this.list);
};

function child(){
  parent.call(this);
  this.type = 'child';
};

child.prototype = Object.create(parent.prototype);
child.constructor = child;

var s1 = new child(); //第二次实例化
s1.list.push(5);
var s2 = new child();

s1.say() // [1,2,3,4,5]
s2.say() // [1,2,3,4]
```

- ES6中的继承

```jsx
//在ES6中存在着class，可以通过extends关键字实现继承
class Animal { 
  constructor(name = 'John Doe', species = '物种'){
    this.name = name; this.species = species; 
  } 
 
  sayHello(){ 
    console.log('hello',this.name,this.species) 
  }
} 

class Sheep extends Animal{
   constructor(name = 'Jimmy',species = '羊'){
     super(name, species); 
  } 
  sayHello(){ 
    console.log('child'); 
    super.sayHello() 
  }
} 

let sheep = new Sheep('Tom'); 
sheep.sayHello();

//实际就是ES5继承模式的语法糖，用super代表父类的this指向；
```

#### 16. 判断两个对象是否相等

```jsx
Object.getOwnPropertyNames()方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。

function isObjectEqual(a, b) {
    // 获取a、b的类型
    var classNameA = toString.call(a)
    var classNameB = toString.call(b)

    if (classNameA === '[object Object]' && classNameB === '[object Object]') {
      var propsA = Object.getOwnPropertyNames(a)
      var propsB = Object.getOwnPropertyNames(b)
      if (propsA.length !== propsB.length) {
        return false
      }
      for (let i = 0; i < propsA.length; i++) {
        var propName = propsA[i]
        if (a[propName] !== b[propName]) {
          return false
        }
      }
      return true
    } else{
      return false
    }
};
```

#### 17. ES6数组方法 [reduce,map,filter,扩展运算符,rest运算符]

- reduce()方法对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值。

```php
array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
```

| 参数                | 描述                           |
| ------------------- | ------------------------------ |
| total   (必需)      | 初始值, 或者计算结束后的返回值 |
| currentValue (必需) | 当前元素                       |
| currentIndex (可选) | 当前元素的索引                 |
| arr (可选)          | 当前元素所属的数组对象         |
| initialValue (可选) | 传递给函数的初始值             |

```jsx
//将二维数组转化为一维
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
  function(a, b) {
    return a.concat(b);
  },
  []
);
// flattened is [0, 1, 2, 3, 4, 5]

//计算数组中每个元素出现的次数
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

var countedNames = names.reduce(function (allNames, name) { 
  if (name in allNames) {
    allNames[name]++;
  }
  else {
    allNames[name] = 1;
  }
  return allNames;
}, {});
// countedNames is:
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }

//数组去重
let arr = [1,2,1,2,3,5,4,5,3,4,4,4,4];
let result = arr.sort().reduce((init, current)=>{
    if(init.length===0 || init[init.length-1]!==current){
        init.push(current);
    }
    return init;
}, []);
console.log(result); //[1,2,3,4,5]
```

- map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

```jsx
let new_array = arr.map(function callback(currentValue, index, array) { 
    // Return element for new_array 
}[, thisArg])
```

| 参数         | 描述                                |
| ------------ | ----------------------------------- |
| currentValue | 数组中正在处理的当前元素            |
| index        | 数组中正在处理的当前元素的索引      |
| array        | map 方法被调用的数组                |
| thisArg      | 执行 callback 函数时 使用的 this 值 |



```go
//求数组中每个元素的平方根
var numbers = [1, 4, 9];
var roots = numbers.map(Math.sqrt);
// roots的值为[1, 2, 3], numbers的值仍为[1, 4, 9]
```

- filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。



```php
var new_array = arr.filter(callback(element[, index[, array]])[, thisArg])
```

| 参数    | 描述                                |
| ------- | ----------------------------------- |
| element | 数组中正在处理的当前元素            |
| index   | 数组中正在处理的当前元素的索引      |
| array   | map 方法被调用的数组                |
| thisArg | 执行 callback 函数时 使用的 this 值 |



```jsx
//筛选排除掉所有的小值
function isBigEnough(element) {
  return element >= 10;
}
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
// filtered is [12, 130, 44]
```

#### 18. 格式化零时区日期



```jsx
//时间格式化
function formatDate(time) {
    function addZero(num) {
        return num < 10 ? '0' + num : num;
    };

    if (time === null || time === "" || time === undefined) {
        return ""
    } else {
        //先取零时区的值
        time = time.split("T");
        var day = time[0].replace(/-/g, '/');
        var moment = time[1].split(".")[0].split(":");
        var hour = moment[0];
        var minute = moment[1];
        var seconds = moment[2];
        time = day + " " + hour + ":" + minute + ":" + seconds;
        //转换为东八区的值
        var date = new Date(Date.parse(time));
        date.setTime(date.setHours(date.getHours() + 8));
        //拼接
        var Y = date.getFullYear() + '-';
        var M = addZero(date.getMonth() + 1) + '-';
        var D = addZero(date.getDate()) + ' ';
        var h = addZero(date.getHours()) + ':';
        var m = addZero(date.getMinutes()) + ':';
        var s = addZero(date.getSeconds());

        return Y + M + D + h + m + s;
    }

};
```