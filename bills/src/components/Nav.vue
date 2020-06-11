<template>
  <footer>
    <div class="nav">
      <router-link class="item" to="/money">记账</router-link>
      <router-link class="item" to="/bill">账单</router-link>
      <router-link class="item" to="/tags">标签</router-link>
    </div>
  </footer>
</template>

<style lang="less" scoped>
footer {
  height: 4rem;
  .nav {
    height: 4rem;
    display: flex;
    flex-flow: row;
    // justify-content: space-around;
    align-items: center;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);
    .item {
      flex: 1;
    }
    :first-child {
      display: flex;
      flex-direction: column;
      align-items: center;
      &::before {
        content: "\e604";
        font-family: "iconfont" !important;
        font-size: 2.2rem;
      }
    }
    :nth-child(2) {
      display: flex;
      flex-direction: column;
      align-items: center;
      &::before {
        content: "\e608";
        font-family: "iconfont" !important;
        font-size: 2.2rem;
      }
    }
    :nth-child(3) {
      display: flex;
      flex-direction: column;
      align-items: center;
      &::before {
        content: "\e60d";
        font-family: "iconfont" !important;
        font-size: 2.2rem;
      }
    }
  }
}
</style>
