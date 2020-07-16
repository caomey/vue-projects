<template>
  <div>
    <div class="bg-url">
      <nav-bar style="background-color: transparent;position: absolute;z-index: 100;" />
      <van-row class="max-box">
        <van-col span="12" style="text-align: right" class="col-table">
          <div class="cell-box">
            <img src="../../../assets/emptyUser.png" alt="头像" />
          </div>
        </van-col>
        <van-col span="12" style="text-align: left;" class="col-table">
          <span class="cell-box username">{{username}}</span>
        </van-col>
      </van-row>
    </div>
    <van-cell
      :value="currentUserInfo().headship"
      value-class="cell-right-msg"
      title-class="cell-title-box"
    >
      <i class="iconfont iconidcard info-msg-icon" slot="title"></i>
    </van-cell>
    <van-cell
      :value="currentUserInfo().sssq"
      is-link
      to="sq"
      value-class="cell-right-msg"
      title-class="cell-title-box"
    >
      <i class="iconfont iconweizhi info-msg-icon" slot="title"></i>
    </van-cell>
    <van-cell value="修改密码" is-link to="pwd">
      <i class="iconfont iconmima info-msg-icon" slot="title"></i>
    </van-cell>
    <bottom-btn text="退出登录" type="danger" @click="toOut"></bottom-btn>
  </div>
</template>

<script>
import navBar from "../../../components/NavBar";
import bottomBtn from "../../../components/BottomBtn";
export default {
  data() {
    return {
      username: this.$store.state.userInfo.name
    };
  },

  methods: {
    toOut() {
      this.$dialog
        .confirm({
          title: "确认退出登录？",
          message: ""
        })
        .then(() => {
          // 退出重置store用户数据 ，并跳转到登录页
          this.$router.push("/login");
          this.$store.setUserInfo(null);
          sessionStorage.clear();
        });
    },
    currentUserInfo() {
      if (this.$store.state.userInfo) {
        const { headship, sssq } = this.$store.state.userInfo;
        return {
          headship,
          sssq
        };
      } else {
        return {};
      }
    }
  },
  components: {
    bottomBtn,
    navBar
  }
};
</script>

<style lang="less" scoped>
.header-img {
  width: 100%;
  height: 25vh;
}

.bg-url {
  width: 100%;
  height: 24vh;
  background-image: url("../../../assets/backdrop.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  text-align: center;
  position: relative;
}

.username {
  padding-left: 5px;
  color: @backfont;
}

.info-msg-icon {
  font-size: 1.2rem;
}
</style>