<template>
  <div>
    <top-bar :top-title="ownData ?   '单元信息' : '添加单元信息'" :remind="enableEdit"></top-bar>
    <div class="cell-info-box" :style="{'pointer-events': enableEdit ? 'auto': 'none'}">
      <van-cell-group class="cell-group-padding">
        <van-field :required="enableEdit" label="单元牌号码" :error-message="mphmErr">
          <template v-slot:input>
            <div class="van-field__body">
              <input v-show="numShow" type="number" ref="mpHmInput" v-model="mphmNum"
                :placeholder="enableEdit ? '请输入单元牌号码' : ''" class="van-field__control" @blur="mphmBlur" />
              <input type="text" v-show="!numShow" v-model="data.mphm" :placeholder="enableEdit ? '请输入单元牌号码！' : ''"
                class="van-field__control" @click="cnClick" readonly style="color: black" />
            </div>
            <span>单元</span>
          </template>
        </van-field>
        <van-field label="俗称/别称" v-model="data.buildsc" :placeholder="enableEdit ?  '多个请用“/”分隔' : ''" />
      </van-cell-group>

      <van-field label="备注" v-model="data.content" rows="2" autosize type="textarea" maxlength="100"
        :placeholder="enableEdit ? '请输入备注，总字数不能超过100个字符' : ''" show-word-limit class="cell-group-padding" />
      <div class="cell-group-padding bottom-div"></div>
    </div>
    <div class="mlp-btn-group" v-show="enableEdit">
      <bottom-btn text="确认" @click="confirm" class="mlp-btn-group-btn" />
      <bottom-btn text="注销" type="danger" @click="clickDelete" class="mlp-btn-group-btn" v-show="!!ownData" />
    </div>
  </div>
</template>

<script>
  import {
    toNm,
    toCn
  } from "@com/cn-nm.js";
  export default {
    data() {
      return {
        data: {
          mphm: "",
          buildsc: "",
          content: ""
        },
        ownData: null,
        enableEdit: true,
        mphmNum: null,
        numShow: false,
        mphmErr: ""
      };
    },
    created() {
      const params = this.$route.params;
      if (params) {
        if (params.ownData) {
          this.ownData = this.data = {
            ...params.ownData
          }
        }
        this.enableEdit = !!params.enableEdit;
      }

    },
    methods: {
      confirm() {
        const data = this.getData();
        let errMsg = data.errMsg;
        if (errMsg) {
          this.$toast(errMsg);
          return;
        }
        const sendData = data.data;
        const params = this.$route.params;
        errMsg = params.receiveData(sendData);
        if (errMsg) {
          this.$toast(errMsg);
          return;
        }
        this.$router.back();
      },
      clickDelete() {
        this.$dialog
          .confirm({
            title: "提示",
            message: "是否注销单元？"
          })
          .then(() => {
            this.$route.params.deleteData(this.ownData);
            this.$router.back();
          })
          .catch(() => {});
      },
      cnClick() {
        this.mphmErr = "";
        this.numShow = true;
        this.$nextTick(() => {
          this.$refs.mpHmInput.focus();
        });

        // 进入时显示成数字
        if (this.data.mphm.length > 0) {
          this.mphmNum = toNm(this.data.mphm);
        }
      },
      mphmBlur() {
        this.numShow = false;
        // 离开显示成汉字
        if (this.mphmNum) {
          this.data.mphm = toCn(this.mphmNum);
        }
      },
      getData() {
        const errMsg = this.checkData();
        return {
          errMsg,
          data: this.data
        };
      },
      checkData() {
        let errMsg = null;
        if (this.data.mphm.length === 0) {
          this.mphmErr = errMsg = "单元牌号码必须填写";
        }
        return errMsg;
      },
    }
  };
</script>