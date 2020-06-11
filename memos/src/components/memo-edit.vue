<template>
  <section id="memo-edit">
    <div class="edit-markdown">
      <div class="header">
        <input type="text" v-model="title" class="title" placeholder="标题" />
        <ul class="tools">
          <li class="save" @click="saveMemo"></li>
          <!-- 退出情况比较简单直接写在标签上 -->
          <li class="exit" @click="exitMemo"></li>
        </ul>
        <div class="dropdown">
          <select v-model="categoryId">
            <option selected="selected" value="1">工作</option>
            <option value="2">生活</option>
            <option value="3">学习</option>
          </select>
        </div>
      </div>
      <div class="content">
        <textarea class="text" v-model="content" placeholder="内容"></textarea>
      </div>
    </div>
  </section>
</template>

<script>
import storage from "../storage/index.js";
import memoArticle from "./memo-article.vue";

var store = storage.store;
var memo = storage.memo;

export default {
  data() {
    return {
      categories: {
        1: "工作",
        2: "生活",
        3: "学习",
      },
      title: this.$store.state.editinfo.title,
      categoryId: this.$store.state.editinfo.categoryId || 1, // 新建的时候给默认分类为工作
      content: this.$store.state.editinfo.content,
    };
  },
  methods: {
    saveMemo() {
      let m = new memo({
        categoryId: this.categoryId || 1,
        title: this.title,
        content: this.content,
      });
      // 因为新建的时候会清空editinfo，判断editinfo不为空则更新，为空则添加
      if (this.$store.state.editinfo) {
        store.update(this.$store.state.editinfo, m);
      } else {
        store.add(m);
      }

      store.saveToLocalStorage();
      this.$store.state.isShow = false;
    },
    exitMemo() {
      this.$store.state.isShow = false;
    },
  },
  computed: {},
};
</script>

<style lang="less">
#memo-edit {
  // display: none;
  position: fixed;
  // background-color: #fff;
  top: 50%;
  left: 50%;
  margin-left: -10rem;
  margin-top: -14rem;
  // border: 1px solid green;
  z-index: 4;
  .edit-markdown {
    // z-index: 3;
    margin-top: 3rem;
    width: 20rem;
    height: 28rem;
    box-shadow: 0px 0px 5px 1px white;
    border-radius: 6px;
    background-color: #fff;
    transition: all 0.1s linear;
    z-index: 2;
  }

  .header {
    height: 40px;
    margin: 0 0.5rem;
  }
  .title {
    float: left;
    width: 8rem;
    margin: 0.5rem auto;
    padding: 0.2rem;
    border-radius: 0.2rem;
    border: 1px solid #bdbdbd;
    font-size: 14px;
    transition: all 0.3s;
    &:focus {
      box-shadow: 0px 0px 5px 1px rgba(102, 175, 233, 0.6);
      border: 1px solid rgb(102, 175, 233);
    }
  }
  .tools {
    float: right;
    li {
      line-height: 2.5rem;
      display: inline-block;
      font-size: 15px;
      margin: auto 5px;
    }
  }
  .dropdown {
    float: right;
    margin-right: 0.5rem;
    padding: 0.2rem;
    line-height: 2.5rem;

    select {
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.2rem;
      outline: none;
      transition: all 0.3s;
      &:focus {
        box-shadow: 0px 0px 5px 1px rgba(102, 175, 233, 0.6);
        border: 1px solid rgb(102, 175, 233);
      }
    }
  }
  .save::before {
    /* border: 1px solid red; */
    content: "\e605";
    font-family: "iconfont" !important;
    font-size: 1.5rem;
    transition: all 0.3s;
  }
  .save:hover::before {
    // font-size: 25px;
    cursor: pointer;
    color: #222;
  }
  .exit::before {
    content: "\e65d";
    font-family: "iconfont" !important;
    font-size: 1.5rem;
    transition: all 0.3s;
  }
  .exit:hover::before {
    // font-size: 25px;
    cursor: pointer;
    color: #222;
  }
  .content {
    .text {
      height: 23rem;
      width: 19rem;
      font-family: Arial, Helvetica, sans-serif;
      // box-shadow: inset 0px 0px 1px 1px rgba(0, 0, 0, 0.3);
      /* text-indent: 2em; */
      margin: 0.5rem 0.5rem;
      border-radius: 0.2rem;
      outline: none;
      resize: none;
      padding: 0.5rem;
      transition: all 0.3s;
      white-space: pre-line;
      word-wrap: break-word;
      &:focus {
        box-shadow: 0px 0px 5px 1px rgba(102, 175, 233, 0.6);
        border: 1px solid rgb(102, 175, 233);
      }
    }
  }
}
</style>
