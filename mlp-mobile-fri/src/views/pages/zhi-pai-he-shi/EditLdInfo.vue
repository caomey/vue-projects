<template>
    <div>
        <top-bar :remind="enableEdit" :top-title="ownData ? '楼栋信息' : '添加楼栋信息'"></top-bar>
        <div class="cell-info-box">
            <form :style="{'pointer-events': enableEdit ? 'auto': 'none'}">
                <van-cell-group class="cell-group-padding">
                    <van-field :required="enableEdit" label="楼牌号码" :error-message="mphmErr">
                        <template v-slot:input>
                            <div>
                                <div class="van-field__body">
                                    <input type="tel" v-model="data.mphm" :placeholder="enableEdit ? '请输入楼牌号码！' : ''"
                                        class="van-field__control" @focus="mphmErr = ''" />
                                    <span>栋</span>
                                </div>
                            </div>
                        </template>
                    </van-field>
                    <van-field label="原楼牌号码" v-model="data.ymphm" :placeholder="enableEdit ? '多个请用“/”分隔' : ''" />
                    <van-field label="俗称/别称" v-model="data.buildsc" :placeholder="enableEdit ? '多个请用“/”分隔' : ''" />
                    <van-field label="建筑物编码" :error-message="buildCodeErr">
                        <template v-slot:input>
                            <div style="width: 100%;">
                                <div class="van-field__body">
                                    <input maxlength="19" type="tel" v-model="data.buildCode"
                                        :placeholder="enableEdit ? '请输入建筑物编码！' : ''" @focus="buildCodeErr = ''"
                                        class="van-field__control buildCode-input" />
                                </div>
                            </div>
                        </template>
                    </van-field>
                </van-cell-group>
            </form>
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
    export default {
        data() {
            return {
                data: {
                    mphm: "",
                    ymphm: "",
                    buildsc: "",
                    buildCode: "",
                    content: ""
                },
                mphmErr: "",
                buildCodeErr: "",
                buildCodeTShow: true,
                enableEdit: true,
                deleteData: null,
                receiveData: null,
                ownData: null,
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
                this.deleteData = params.deleteData
                this.receiveData = params.receiveData
            }

        },
        methods: {
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
                    this.mphmErr = errMsg = "楼牌号码必须填写"
                }
                if (
                    /^[0-9]*$|^[\u4e00-\u9fa5]{0,}[0-9]{1,}$/.test(this.data.mphm) === false
                ) {
                    this.mphmErr = errMsg =
                        "楼牌号码只能输入纯数字/中文+数字,中文禁止输入‘栋’! 例如:303、雅苑23";
                }
                if (/(^$)|(^[0-9T]+$)/.test(this.data.buildCode) === false) {
                    this.buildCodeErr = errMsg =
                        "建筑物编码只能为数字或字母T，字母T只能放在第15位";
                } else {
                    if (
                        this.data.buildCode.indexOf("T") != -1 &&
                        this.data.buildCode.indexOf("T") != 14
                    ) {
                        this.buildCodeErr = errMsg =
                            "建筑物编码字母T只能放在第15位";
                    }
                }

                return errMsg;
            },
            confirm() {
                const data = this.getData();
                let errMsg = data.errMsg;
                if (errMsg) {
                    this.$toast(errMsg)
                    return;
                }
                const ownData = data.data;
                errMsg = this.receiveData(ownData);
                if (errMsg) {
                    this.$toast(errMsg)
                    return;
                }
                this.$router.back()
            },
            clickDelete() {
                this.$dialog
                    .confirm({
                        title: "提示",
                        message: "是否注销楼栋？"
                    })
                    .then(() => {
                        this.deleteData(this.ownData);
                        this.$router.back();
                    }).catch(() => {

                    })
            },
        }
    };
</script>