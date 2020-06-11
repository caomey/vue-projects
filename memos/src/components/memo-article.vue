<template>
  <div class="memo-container">
    <div class="memo">
      <div class="header">
        <!-- <h5 class="title">我是标题</h5> -->
        <h5 class="title">{{ memo.title }}</h5>
        <ul class="tools">
          <!-- 编辑笔记比较复杂， 点击编辑，先将当前笔记$emit的父组件app，父组件props再传给memo-edit.vue处理 -->
          <li class="edit" @click="editMemo"></li>
          <li class="delete" @click="deleteMemo"></li>
        </ul>
      </div>
      <div class="info">
        <span class="timestamp">{{ memo.date }}</span>
        <span class="catagory">分类：{{ categories[memo.categoryId] }}</span>
      </div>
      <div class="content">
        <div class="text markdown-body" v-html="marked(memo.content)"></div>
      </div>
    </div>
  </div>
</template>
<script>
import storage from "../storage/index.js";
let localstore = storage.store;

export default {
  props: ["memo"], // 此处还是要从父组件传过来，当前遍历的是哪篇笔记
  data() {
    return {
      editinfo: "", // 只要被点击的memo信息，就会被当前最新的点击覆盖
      categories: {
        1: "工作",
        2: "生活",
        3: "学习",
      },
    };
  },
  methods: {
    marked,
    deleteMemo() {
      if (confirm(`确定删除“${this.memo.title}”吗？`)) {
        localstore.remove(this.memo);
        localstore.saveToLocalStorage();
      }
    },
    editMemo() {
      this.$store.state.editinfo = this.memo;
      this.$store.state.isShow = true;
    },
  },
};
</script>

<style lang="less">
.memo {
  margin: 0.5rem 0.5rem;
  display: flex;
  flex-flow: column;
  box-sizing: border-box; //全局设置了border-box未生效
  padding: 0.3rem 0.3rem;
  border: 1px solid #bdbdbd;
  box-shadow: 0px 0px 10px 1px #c4c4c4;
  border-radius: 6px;
  background-color: #fff;
  transition: all 0.1s linear;
  .content {
    height: 30rem;
    overflow-y: scroll;
    word-wrap: break-word;
    img {
      box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.5);
      width: 100%;
    }
  }
  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  .title {
    padding-bottom: 0.2rem;
    border-bottom: 1px solid #bdbdbd;
    font-size: 0.8rem;
  }

  .tools li {
    display: inline-block;
    font-size: 1rem;
    margin: auto 0.3rem;
  }
  .edit::before {
    /* border: 1px solid red; */
    content: "\e61b";
    font-family: "iconfont" !important;
    font-size: 1.2rem;
    transition: all 0.3s;
  }
  .edit:hover::before {
    // font-size: 25px;
    color: #222;
  }
  .delete::before {
    content: "\e61c";
    font-family: "iconfont" !important;
    font-size: 1.2rem;
    transition: all 0.3s;
  }
  .delete:hover::before {
    // font-size: 25px;
    color: #222;
  }
  .info {
    height: 1rem;
    display: flex;
    flex-flow: row wrap;
    margin: 0.3rem 0;
    justify-content: space-between;
    color: #888;
  }
  .timestamp {
    font-size: 0.6rem;
  }
  .catagory {
    font-size: 0.6rem;
  }
}
.memo:hover {
  box-shadow: 0px 0px 10px 1px #a3a3a3;
  transform: scale(1.03);
}
// 媒体查询一般放在后面，css权重问题
.memo-container {
  @media (max-width: 768px) {
    width: 50%;
    .content {
      height: 15rem;
    }
  }
  @media (min-width: 768px) and (max-width: 1200px) {
    width: 100%/3;
    .content {
      height: 20rem;
    }
  }
  @media (min-width: 1200px) {
    width: 25%;
  }
}
</style>
