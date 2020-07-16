<template>
  <div>
    <top-bar top-title="重置登录密码"></top-bar>
    <van-cell-group>
      <van-field v-model="pwd" required type="password" label="原密码" />
      <van-field v-model="newPwd" required type="password" label="新密码" />
      <van-field
        v-model="confimPwd"
        required
        type="password"
        label="确认密码"
        :error-message="confirmErrMsg"
        @focus=" confirmErrMsg = ''"
      />
    </van-cell-group>
    <bottom-btn text="完成" @click="doFixPwd"></bottom-btn>
  </div>
</template>

<script>
import topBar from "@/views/pages/TopBar";
import bottomBtn from "../../../components/BottomBtn";
import api from "../../../components/api";
export default {
  data() {
    return {
      pwd: "",
      newPwd: "",
      confimPwd: "",
      confirmErrMsg: ""
    };
  },
  components: {
    topBar,
    bottomBtn
  },
  methods: {
    doFixPwd() {
      // 密码确认验证
      if (this.confimPwd != this.newPwd) {
        this.confirmErrMsg = "*确认密码不一致";
        return;
      }
      this.$dialog
        .confirm({
          title: "确认修改密码？",
          message: ""
        })
        .then(() => {
          api
            .modifyPassword(this.pwd, this.newPwd)
            .then(() => {
              this.$toast.success("密码修改成功");
              this.$store.setUserInfo(null);
              sessionStorage.clear();
              this.$router.push("/login");
            })
            .catch(err => {
              if (err.status && err.status == 6001) {
                this.$toast("原密码不正确，请重新填写！");
              }
            });
        })
        .catch(() => {});
    }
  }
};
</script>

<style>
</style>