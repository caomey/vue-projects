<template>
  <div>
    <img class="login-back-img" src="../../assets/loginBack.png" />
    <van-cell-group>
      <van-field
        v-model="username"
        placeholder="请输入账号"
        label="账号"
        class="login-username-box"
      />
      <van-field
        v-model="password"
        placeholder="请输入密码"
        type="password"
        label="密码"
      />
    </van-cell-group>
    <bottom-btn @click="toLogin" :disabled="disLoginBtn" text="登录" />
    <van-dialog
      v-model="showVerify"
      title="验证"
      :show-confirm-button="false"
      close-on-click-overlay
    >
      <div style="width: fit-content;margin: 0 auto;">
        <slide-verify
          ref="slideblock"
          @refresh="refresh"
          @again="onAgain"
          @fail="onFail"
          @success="onSuccess"
          :imgs="verifyImgs"
          slider-text="向右滑"
        ></slide-verify>
      </div>

      <br />
    </van-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import api from "../../components/api";
import bottomBtn from "../../components/BottomBtn";
import SlideVerify from "vue-monoplasty-slide-verify";
import generateCode from "../../components/canvas-verification-code";
Vue.use(SlideVerify);
export default {
  data() {
    const verifyImgs = [];
    const verificationCode = generateCode(300, 150);
    verifyImgs.push(verificationCode.data);
    for (let index = 1; index < 6; index++) {
      const img = require(`../../assets/verify-${index}.jpg`);
      verifyImgs.push(img);
    }
    return {
      showVerify: false,
      verifyImgs,
      username: "htdwtest01",
      password: "067400",
    };
  },
  created() {
    if (this.$store.state.userInfo != null) {
      this.username = this.$store.state.userInfo.userName;
    }
  },
  computed: {
    disLoginBtn() {
      return !(this.username.length > 0 && this.password.length > 0);
    },
  },
  components: {
    bottomBtn,
  },
  methods: {
    toLogin() {
      // 已经登录过了不用再验证
      if (this.$store.state.userInfo != null) {
        this.login();
      } else {
        this.showVerify = true;
      }
    },
    onSuccess() {
      // console.log("验证通过");
      this.login();
    },
    onFail() {
      // console.log('验证不通过');
      this.verifyFail();
    },
    onAgain() {
      // console.log("检测到非人为操作的哦！");
      // 刷新
      this.$refs.slideblock.reset();
      this.verifyFail();
    },
    verifyFail() {
      this.password = "";
      this.refresh();
      this.$toast.fail("验证失败");
      setTimeout(() => {
        this.showVerify = false;
      }, 500);
    },
    refresh() {
      const index = parseInt(Math.random() * this.verifyImgs.length);
      const verificationCode = generateCode(300, 150);
      this.$set(this.verifyImgs, index, verificationCode.data);
    },
    login() {
      api
        .doLogin(this.username, this.password)
        .then((response) => {
          console.log("response", response);

          //userInfo
          const mobileUser = response.data.mobileUser;
          mobileUser.name = response.data.user.name;
          mobileUser.headship = response.data.user.headship;
          mobileUser.sssq = response.data.user.sssq;
          mobileUser.ssfjCode = response.data.user.ssfjCode;
          mobileUser.roleId = response.data.user.roleId;

          this.$store.setUserInfo(mobileUser);
          this.$router.push("/home");
        })
        .catch((error) => {
          if (this.showVerify) {
            this.$refs.slideblock.reset();
            this.showVerify = false;
          }
          console.error("doLogin error", error);
        });
    },
  },
};
</script>

<style>
.login-username-box input {
  ime-mode: active;
}

.login-back-img {
  width: 100%;
  max-height: 60vh;
}
</style>
