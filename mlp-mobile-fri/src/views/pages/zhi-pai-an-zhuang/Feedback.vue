<template>
  <div>
    <van-field label="地址信息" readonly :value="address" />
    <select-drop
      label="错误原因"
      required
      :options="resasonOntions"
      v-model="resasonSelect"
      text-key="itemName"
      value-key="itemId"
    />
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
  </div>
</template>

<script>
import api from "../../../components/api";
export default {
  data() {
    return {
      resasonSelect: null,
      content: "",
      resasonOntions: []
    };
  },
  props: ["address", "taskId"],
  created() {
    api.getDictitemByType(22).then(responseData => {
      this.resasonOntions = responseData.data;
    });
  },
  methods: {
    submit() {
      if (this.resasonSelect) {
        api
          .taskErrorFeedBack(
            this.taskId,
            this.resasonSelect.itemName,
            this.content
          )
          .then(() => {
            this.content = "";
            this.resasonSelect = null;
            this.$emit("success");
          });
      } else {
        this.$toast("请选择错误原因");
      }
    }
  }
};
</script>

<style>
</style>