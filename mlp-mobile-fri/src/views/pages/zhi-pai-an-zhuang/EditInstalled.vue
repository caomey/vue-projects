<template>
  <div>
    <top-bar top-title="制牌安装"></top-bar>
    <div class="mp-cell-box">
      <van-cell-group class="cell-group-padding">
        <van-field label="地址信息" readonly :value="address" />
        <van-field label="门牌信息" readonly :value="mpMsg" />
      </van-cell-group>
      <van-field
        :value="temp.content"
        rows="2"
        readonly
        autosize
        error
        label="未通过原因"
        type="textarea"
        class="cell-group-padding"
      />
      <van-cell-group class="cell-group-padding" style="padding: 5px 5px;">
        <div class="upload-title">照片上传</div>

        <van-row>
          <van-col span="12" style="text-align: center">
            <upload-img v-model="photo1" title="建筑物(商铺)全景" />
          </van-col>

          <van-col span="12" style="text-align: center">
            <upload-img v-model="photo2" title="已安装实景" />
          </van-col>
        </van-row>
      </van-cell-group>
      <div class="cell-group-padding bottom-div"></div>
    </div>
    <bottom-btn @click="clickSubmit" text="提交" />
  </div>
</template>

<script>
import uploadImg from "../../../components/UploaderImg";
import api from "../../../components/api";
export default {
  data() {
    return {
      point: null,
      photo1: null,
      photo2: null,
      content: "",
      temp: null
    };
  },
  components: {
    uploadImg
  },
  created() {
    this.temp = this.$route.params.temp;

    if (this.temp && this.temp.lat) {
      this.content = this.temp.content ? this.temp.content : "";
      this.photo1 = this.temp.photo1;
      this.photo2 = this.temp.photo2;
    }
  },
  computed: {
    address() {
      const records = this.temp;
      return (
        records.szjd + records.szsq + records.roadName + records.mphm + "号"
      );
    },
    mpMsg() {
      return this.temp.roadName + this.temp.mphm + "号";
    }
  },
  methods: {
    clickSubmit() {
      if (!this.photo1) {
        this.$toast("请上传建筑物(商铺)全景照片");
        return;
      }
      if (!this.photo2) {
        this.$toast("请上传已安装实景照片");
        return;
      }
      api
        .handleAgain(
          this.temp.addressId,
          this.temp.addressType,
          this.photo1,
          this.photo2
        )
        .then(() => {
          this.$toast.success("安装信息提交成功");
          this.$router.back();
          this.$store.updateInstallDataState();
        });
    }
  }
};
</script>

<style>
</style>