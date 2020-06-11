<template>
  <nav>
    <section id="title">记事本</section>
    <label for="toggle-nav"></label>
    <input type="checkbox" id="toggle-nav" />
    <section id="navbar">
      <div class="nav add" @click="buildMemo">新建</div>
      <div class="nav categories">
        <div class="dropdown-toggle" @click="categoryDropdown">
          {{ categories[categoryId] }}
        </div>
        <ul class="dropdown-menu" v-if="$store.state.categoryDropdown">
          <li @click="selectAll">全部</li>
          <li @click="selectWork">工作</li>
          <li @click="selectStudy">学习</li>
          <li @click="selectLife">生活</li>
        </ul>
      </div>
      <div class="nav sort-by">
        <div class="dropdown-toggle" @click="sortbyDropdown">
          {{ sortby[sortbyId] }}
        </div>
        <ul class="dropdown-menu" v-if="$store.state.sortbyDropdown">
          <li @click="sortByTime">按时间排序</li>
          <li @click="sortByTitle">按标题排序</li>
        </ul>
      </div>
      <div class="nav search">
        <input
          type="text"
          v-model="queryString"
          @keyup="filteredByContent"
          placeholder="过滤标题, 内容, 时间"
        />
        <!-- 筛选内容时要考虑到当前类别 -->
      </div>
    </section>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      code: 1,
      categoryId: 1,
      categories: {
        1: "工作",
        2: "生活",
        3: "学习",
        4: "全部",
      },
      sortbyId: 1,
      sortby: {
        1: "按时间排序",
        2: "按标题排序",
      },
      queryString: "",
    };
  },
  methods: {
    categoryDropdown() {
      this.$store.state.categoryDropdown = true;
      console.log(666666, this.$store.state.categoryDropdown);
    },
    sortbyDropdown() {
      this.$store.state.sortbyDropdown = true;
      console.log(77777777, this.$store.state.sortbyDropdown);
    },
    buildMemo() {
      this.$store.state.isShow = true;
      console.log(this.$store.state.isShow);
      this.$store.state.editinfo = "";
    },
    // 筛选类别
    selectAll() {
      this.categoryId = 4;
      this.$store.state.filteredMemos = this.$store.state.memos;
      this.$store.state.categoryDropdown = false;
    },
    selectWork() {
      this.categoryId = 1;
      this.$store.state.filteredMemos = this.$store.state.memos.filter(
        (item) => {
          return item.categoryId == 1;
        }
      );
      this.$store.state.categoryDropdown = false;
    },
    selectLife() {
      this.categoryId = 2;
      this.$store.state.filteredMemos = this.$store.state.memos.filter(
        (item) => {
          return item.categoryId == 2;
        }
      );
      this.$store.state.categoryDropdown = false;
    },
    selectStudy() {
      this.categoryId = 3;
      this.$store.state.filteredMemos = this.$store.state.memos.filter(
        (item) => {
          return item.categoryId == 3;
        }
      );
      this.$store.state.categoryDropdown = false;
    },
    // 排序
    sortByTime() {
      this.sortbyId = 1;
      this.$store.state.filteredMemos.sort((a, b) => {
        if (a["date"] < b["date"]) {
          return -1 * this.code;
        } else {
          return 1 * this.code;
        }
      });
      this.code = -1 * this.code;
      this.$store.state.sortbyDropdown = false;
    },
    sortByTitle() {
      this.sortbyId = 2;
      this.$store.state.filteredMemos.sort((a, b) => {
        if (a["title"] < b["title"]) {
          return -1 * this.code;
        } else {
          return 1 * this.code;
        }
      });
      this.code = -1 * this.code;
      this.$store.state.sortbyDropdown = false;
    },
    filteredByContent() {
      console.log(this.queryString);
      if (this.queryString !== "") {
        this.$store.state.filteredMemos = this.$store.state.memos.filter(
          (item) => {
            console.log(item);
            return (
              item.title.indexOf(this.queryString) !== -1 ||
              item.date.indexOf(this.queryString) !== -1 ||
              item.content.indexOf(this.queryString) !== -1
            );
          }
        );
      }
    },
  },
};
</script>
<style lang="less" scoped>
li {
  list-style: none;
}
nav {
  z-index: 3;
  background-color: #fff;
  height: 3rem;
  padding: 0 1rem;
  background-color: #fff;
  border-bottom: 1px solid #e7e7e7;
  #title {
    float: left;
    margin-right: auto;
    font-size: 1.2rem;
    line-height: 3rem;
    font-weight: 700;
  }
  #navbar {
    float: right;
    box-sizing: content-box;
    > div {
      .dropdown-toggle,
      .dropdown-menu {
        padding: 0 2rem;
      }
      &.add {
        padding: 0 2rem;
      }
    }
    .nav {
      float: left;
      line-height: 3rem;
      position: relative;
      box-sizing: content-box;
      .dropdown-menu {
        line-height: 2rem;
        background-color: #fff;
        box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);
      }
      .dropdown-toggle::after {
        content: "";
        // 子绝父相，定位三角形
        position: absolute;
        top: 1rem; // 距离父盒子顶部
        right: 0.2rem; // 距离父盒子右边
        width: 10px;
        height: 10px;
        border-right: 2px solid #777;
        border-bottom: 2px solid #777;
        transform: rotate(45deg);
        transition: all 0.3s;
      }
      /*鼠标经过div里面的三角旋转*/
      &:hover {
        .dropdown-toggle::after {
          transform: rotate(225deg);
        }
        cursor: pointer;
        background-color: #ddd;
      }
    }
  }
  label::before {
    content: "\e621";
    font-family: "iconfont" !important;
    font-size: 1.5rem;
    border: solid 1px #ddd;
    padding: 0.5rem;
    cursor: pointer;
  }
  label {
    float: right;
    display: none; // 隐藏点击lable
    line-height: 3rem;
    & + input {
      display: none; // 隐藏checkbox
    }
    & + input:checked {
      // 写点击事件，点击chekbox显示导航栏！！！！！！！！！！！！
      & + #navbar {
        width: 100%; // 将宽度调到100%， 换行！
        display: flex;
        flex-direction: column;
        z-index: 1000;
        background-color: white;
        .dropdown {
          width: 100%;
          // border: solid 1px red;
          margin: 0.3rem 0.3rem;
          .dt {
            width: 100%;
            height: 2rem;
            line-height: 2rem;
          }
          .dd {
            margin: 0;
            position: absolute;
            // background-color: brown;
          }
          .search {
            margin-bottom: 0.5rem;
          }
        }
      }
    }
  }
}
.search {
  float: left;
  input {
    border: 1px solid red;
    width: calc(100% - 24px);
    min-width: 180px;
    margin: 6px 12px;
    height: 34px;
    padding: 6px 12px;
    color: #555;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  }
}

@media screen and (max-width: 768px) {
  nav {
    #navbar {
      display: none; // 手机设备先隐藏导航栏
      box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.3);
      border-top: none;
    }
  }
  nav label {
    display: block;
  }
}
</style>
