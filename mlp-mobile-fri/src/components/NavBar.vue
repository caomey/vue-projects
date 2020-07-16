<template>
  <van-row class="bar-box">
    <van-col span="3" class="col-table" @click="$router.back()">
      <div class="cell-box">
        <i class="iconfont iconback top-bar-left"></i>
      </div>
    </van-col>
    <van-col span="18" style="height:100%;">
      <slot name="middle"></slot>
    </van-col>
    <van-col span="3" style="height:100%;">
      <slot name="right"></slot>
    </van-col>
  </van-row>
</template>
