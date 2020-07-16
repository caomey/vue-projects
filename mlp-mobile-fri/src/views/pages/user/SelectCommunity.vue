<template>
  <div>
    <top-bar top-title="请选择所属警务社区"></top-bar>
    <van-picker :columns="sqList" ref="sqPicker" />
    <bottom-btn @click="confirm" v-show="showSqBtn" text="确认" />
  </div>
</template>

<script>
  import api from "../../../components/api";
  import bottomBtn from "../../../components/BottomBtn";
  import topBar from "../TopBar"
  export default {
    data() {
      return {
        showSqBtn: false,
        sqList: []
      };
    },
    components: {
      bottomBtn,
      topBar
    },
    methods: {
      confirm() {
        const selectJwsq = this.$refs.sqPicker.getValues()[0];
        this.$dialog
          .confirm({
            title: "提示",
            message: `是否确定选择${selectJwsq}`
          })
          .then(() => {
            this.$store.state.userInfo.jwsq = selectJwsq;

            const next = this.$route.query && this.$route.query.next;
            if (next) {
              this.$router.replace(next);
            } else {
              this.$router.back();
            }
          });
      }
    },
    created() {
      api.getSqList().then(response => {
        this.sqList = response.data;
        if (this.sqList.length > 0) {
          this.showSqBtn = true;
        }
      })
    }
  };
</script>

<style>
</style>