<template>
  <div id="app">
    <canvas id="q"></canvas>
    <div class="cover-layer" v-if="$store.state.isShow"></div>
    <memo-nav></memo-nav>
    <article>
      <!-- 按筛选后的结果遍历，初始筛选结果为空用memos -->
      <memoArticle
        v-for="item in $store.state.filteredMemos || $store.state.memos"
        :memo="item"
        :key="item.id"
      ></memoArticle>
    </article>
    <memo-edit v-if="$store.state.isShow"></memo-edit>
  </div>
</template>

<script>
import "./assets/base.css";

import Vue from "vue";
import memoNav from "./components/memo-nav.vue";
import memoArticle from "./components/memo-article.vue";
import memoEdit from "./components/memo-edit.vue";

export default Vue.extend({
  data() {
    return {};
  },
  methods: {},
  watch: {
    isShow() {},
  },
  components: {
    memoNav,
    memoArticle,
    memoEdit,
  },
});
</script>

<style lang="less">
#app {
  display: flex;
  position: relative;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 80rem;
}
article {
  margin: 2rem auto;
  width: 90%;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  @media (max-width: 768px) {
    width: 100%;
  }
}
.cover-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #222;
  opacity: 0.5;
  z-index: 4;
}
canvas {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
}
</style>
