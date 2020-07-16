<template>
  <!-- <keep-alive>
    <router-view>
    </router-view>
  </keep-alive>-->
  <!-- <transition name="van-fade">

  </transition>-->
  <vue-page-stack>
    <router-view />
  </vue-page-stack>
</template>




<style lang="less" scoped>
.header-bar {
  position: fixed;
  top: 0px;
  z-index: 999;
}

.middlle-title {
  color: @backfont;
  font-weight: 50;
  font-size: 1rem;
}

.pages-box {
  // height: 100%;
  position: relative;
}
</style>