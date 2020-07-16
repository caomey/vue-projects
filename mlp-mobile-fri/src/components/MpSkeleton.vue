<template>
  <div>
    <van-skeleton :loading="loading" v-bind="$attrs">
      <template v-if="!isRefresh">
        <van-empty image="network" description="点击重试" v-if="!success" @click.native="doLoad" />
        <slot v-if="success"></slot>
      </template>
    </van-skeleton>
    <van-pull-refresh v-model="loading" @refresh="doLoad" v-if="isRefresh" v-show="!loading">
      <van-empty :image="emptyImg" description="点击重试" v-if="!success" @click.native="doLoad" />
      <slot v-if="success"></slot>
    </van-pull-refresh>
  </div>
</template>

<script>
import emptyImg from "../assets/empty-image-network.png";
export default {
  name: "MpSkeleton",
  data() {
    return {
      loading: true,
      success: false,
      emptyImg
    };
  },
  props: {
    asyncLoad: Function,
    isRefresh: Boolean
  },
  created() {
    this.doLoad();
  },
  methods: {
    doLoad() {
      this.loading = true;
      const promise = this.asyncLoad();
      if (promise) {
        promise
          .then(() => {
            this.loading = false;
            this.success = true;
          })
          .catch(() => {
            this.loading = false;
            this.success = false;
          });
      } else {
        this.loading = false;
        this.success = false;
      }
    }
  }
};
</script>