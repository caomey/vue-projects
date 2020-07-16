<template>
  <div class="uploader-img-warp">
    <van-uploader
      v-bind="$attrs"
      v-model="fileList"
      result-type="file"
      :max-count="1"
      :after-read="afterRead"
      :before-delete="beforeDelete"
    />
    <div class="photo-lable">{{title}}</div>
  </div>
</template>

<script>
import lrz from "lrz";
import api from "./api";
export default {
  data() {
    return {
      fileList: []
    };
  },
  model: {
    prop: "photo",
    event: "change-photo"
  },
  props: ["title", "photo"],
  created() {
    if (this.photo && this.photo.length > 7) {
      this.fileList = [
        {
          url: api.getImgSrc(this.photo),
          isImage: true
        }
      ];
      this.$emit("change-photo", null);
    }
  },
  methods: {
    afterRead(vfile) {
      const file = vfile.file;
      lrz(file, {
        width: 640,
        height: 640
      }).then(rst => {
        this.$emit("change-photo", rst.file);
        this.fileList = [
          {
            url: rst.base64,
            isImage: true
          }
        ];
      });
    },
    beforeDelete() {
      this.$emit("change-photo", null);
      return true;
    }
  }
};
</script>

<style lang="less" scoped>
.uploader-img-warp {
  text-align: center;
}
.photo-lable {
  font-size: 0.8rem;
}
</style>