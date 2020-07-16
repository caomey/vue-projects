<template>
  <div>
    <top-bar remind top-title="制牌安装"></top-bar>
    <div class="mp-cell-box">
      <van-cell-group class="cell-group-padding">
        <van-field label="地址信息" readonly :value="temp.address" />
        <van-field label="俗称/别称" readonly :value="temp.buildsc" />
        <pick-location v-model="point" />
      </van-cell-group>
      <van-field
        v-model="content"
        rows="2"
        autosize
        label="备注"
        type="textarea"
        maxlength="50"
        placeholder="请输入备注，总字数不能超过50个字符"
        show-word-limit
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
import pickLocation from "../../../components/PickLocation";
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
    uploadImg,
    pickLocation
  },
  created() {
    this.temp = this.$route.params.temp;

    if (this.temp && this.temp.lat) {
      this.content = this.temp.content ? this.temp.content : "";
      this.point = {
        x: this.temp.lat,
        y: this.temp.lng
      };
      this.photo1 = this.temp.photo1;
      this.photo2 = this.temp.photo2;
    }
  },
  methods: {
    clickSubmit() {
      if (!this.point.x) {
        this.$toast("请选取地理位置");
        return;
      }
      if (!this.photo1) {
        this.$toast("请上传建筑物(商铺)全景照片");
        return;
      }
      if (!this.photo2) {
        this.$toast("请上传已安装实景照片");
        return;
      }
      api
        .taskInstallTemp(
          this.temp.taskId,
          this.content,
          this.point.x,
          this.point.y,
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
