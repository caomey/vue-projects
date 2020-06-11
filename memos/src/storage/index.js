class memo {
  constructor(obj) {
    // 1工作 2生活 3学习
    this.categoryId = obj.categoryId;
    this.title = obj.title;
    this.content = obj.content;
    this.date = JSON.stringify(new Date()).slice(1, 11);
    // console.log(this);
  }
}
// 测试
// a = new memo({
//   categoryId: 1,
//   title: "213",
//   content: "1234123",
// });
// console.log(a);

// 新增记事
class createMemo {
  constructor() {
    this.memos = [];
  }
  //读取本地localstorage的内容
  loadLocalStorage() {
    this.memos = JSON.parse(localStorage.getItem("store")).memos;
  }
  // 存储到localstorage
  saveToLocalStorage() {
    localStorage.setItem("store", JSON.stringify(this));
  }
  // 增 删 改，初始化
  add(memo) {
    this.memos.push(memo);
  }
  remove(memo) {
    this.memos.splice(this.memos.indexOf(memo), 1);
  }
  update(memo, newMemo) {
    this.memos.splice(this.memos.indexOf(memo), 1, newMemo);
  }
  init() {
    let m1 = new memo({
      categoryId: 1,
      title: "功能介绍",
      content:
        "### 1. 可以使用markdown语法\n1.[markdown介绍(点我）](https://www.jianshu.com/p/191d1e21f7ed)\n```\n# 这是一级标题 \n##  这是二级标题 \n###  这是三级标题 \n```\n2.插入图片\n\n`![](图片url)`\n\n![](https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2771947279,1942205435&fm=26&gp=0.jpg)\n### 2. 笔记操作\n1.新建笔记\n\n2.编辑笔记\n\n3.筛选类别\n\n4.笔记排序\n\n5.搜索笔记",
    });
    m1.date = "2020-06-03";
    this.add(m1);

    let m2 = new memo({
      categoryId: 3,
      title: "瀑布文字源码",
      content:
        '```\n<canvas id="q"></canvas>\n<style>\n  body {\n    margin: 0;\n    overflow: hidden;\n  }\n</style>\n<script>\n  const s = window.screen;\n  const w = (q.width = s.width);\n  const h = (q.height = s.height);\n  const ctx = q.getContext("2d");\n  const p = Array(Math.floor(w / 10) + 1).fill(0);\n\n  const random = (items) => items[Math.floor(Math.random() * items.length)];\n  const hex = "0123456789ABCDEF".split("");\n\n  setInterval(() => {\n    ctx.fillStyle = "rgba(0,0,0,.05)";\n    ctx.fillRect(0, 0, w, h);\n    ctx.fillStyle = "#0f0";\n    p.map((v, i) => {\n      ctx.fillText(random(hex), i * 10, v);\n      p[i] = v >= h || v > 50 + 10000 * Math.random() ? 0 : v + 10;\n    });\n  }, 1000 / 30);\n</script>\n```',
    });
    m2.date = "2020-06-03";
    this.add(m2);

    let m3 = new memo({
      categoryId: 3,
      title: "今天你更博学了吗？",
      content:
        "# flex弹性盒子布局\n\n\n\n## 基本概念\n\n采用Flex布局的元素，称为Flex容器（flex container），简称”容器”。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称”项目”。\n\n![](https://img-blog.csdnimg.cn/20190405163746672.png)\n\n容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。",
    });

    m3.date = "2020-06-03";
    this.add(m3);
    let m4 = new memo({
      categoryId: 2,
      title: "庐山",
      content:
        "# 《望庐山瀑布》\n\n日照香炉生紫烟，遥看瀑布挂前川。\n\n飞流直下三千尺，疑是银河落九天。\n![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591329967420&di=6454e6b74404396d881616d1294eee04&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn%2Fw600h475%2F20180224%2F541e-fyrwsqh6788464.jpg)",
    });
    m4.date = "2020-06-03";
    this.add(m4);
    this.saveToLocalStorage();
  }
}

let store = new createMemo();

if (localStorage.getItem("store") !== null) {
  store.loadLocalStorage();
} else {
  store.init();
}

let storage = {
  memo,
  store,
};

console.log(store);
export default storage;
