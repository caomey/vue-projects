<template>
  <div>
    <top-bar remind top-title="添加门牌"></top-bar>
    <mp-info ref="mpInfo" :no-requird="{buildcode: true}"></mp-info>
    <bottom-btn @click="clickSubmit" text="提交" />
  </div>
</template>

<script>
import topBar from "@/views/pages/TopBar";
import mpInfo from "./MpInfo";
import bottomBtn from "../../../components/BottomBtn";
import api from "../../../components/api";
export default {
  name: "addMp",
  data() {
    return {};
  },
  components: {
    topBar,
    mpInfo,
    bottomBtn
  },
  methods: {
    clickSubmit() {
      const data = this.$refs.mpInfo.getData();
      console.log("this.$refs.mpInfo.getData()", data);
      if (data.errMsg) {
        this.$toast(data.errMsg);
      } else {
        //检查添加门牌照片
        const photo3 = data.packData.photo3;
        if (photo3 == null) {
          this.$toast("未上传门牌照片");
          return;
        }
        // 检查门牌号是否已经存在
        const mphm = data.packData.taskButchVos.taskTemp.mphm;
        const roadName = data.packData.taskButchVos.taskTemp.roadName;
        api
          .getMpExist(roadName, mphm)
          .then(() => {
            this.$toast("该门牌号码已存在，请重新输入");
          })
          .catch(error => {
            if (error.status && error.status == 202) {
              api
                .insertVerified(photo3, data.packData.taskButchVos)
                .then(responseData => {
                  if (responseData.status == 200) {
                    this.$toast.success("门牌添加成功");
                    this.resetData();
                    this.$store.updateMlpDataState();
                    this.$router.back();
                  }
                });
            } else {
              this.$toast.fail("系统错误");
            }
          });
      }
    },
    resetData() {
      this.$refs.mpInfo.initData();
    }
  }
};
</script>

<style>
</style>