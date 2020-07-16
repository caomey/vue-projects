<template>
  <div>
    <top-bar :remind="!enableEdit" top-title="门牌信息"></top-bar>
    <mp-skeleton title avatar :row="10" :async-load="loadData">
      <mp-info :enable-edit="enableEdit" :no-show="noShow" :temp-data="tempData" ref="mpInfo"></mp-info>
      <div class="mlp-btn-group">
        <bottom-btn @click="clickSubmit" text="提交" class="mlp-btn-group-btn" v-show="verifyState == 0" />
        <bottom-btn @click="clickBSPSubmit" text="提交" class="mlp-btn-group-btn" v-show="verifyState == -2" />
        <bottom-btn @click="clickZhongZhi" type="danger" text="终止" class="mlp-btn-group-btn"
          v-show="verifyState == 0" />
        <bottom-btn @click="clickZhuXiao" text="注销" type="danger" class="mlp-btn-group-btn" v-show="!tasktypeId" />
        <bottom-btn @click="clickCheHui" text="撤回" type="danger" class="mlp-btn-group-btn" v-show="verifyState == 1" />
      </div>
      <van-dialog v-model="showDelDialog" title="提示" show-cancel-button showConfirmButton @confirm="handelDel"
        @cancel="showDelDialog = false">
        <div class="delContent">
          <van-cell-group>
            <van-field type="textarea" v-model="zhuXiaoContent" placeholder="请输入注销原因..." required clearable />
          </van-cell-group>
        </div>
      </van-dialog>
      <van-dialog v-model="showStopDialog" title="提示" show-cancel-button showConfirmButton @confirm="handelStop">
        <div class="delContent">
          <van-cell-group>
            <van-field type="textarea" v-model="stopVal" placeholder="请输入终止原因..." required clearable />
          </van-cell-group>
        </div>
      </van-dialog>
      <!-- 组件调用的提示框 -->
      <van-dialog v-model="showCheHuiDialog" title="提示" show-cancel-button showConfirmButton closeOnPopstate
        @confirm="handelCheHui" @cancel="showCheHuiDialog = false" :before-close="cheHuiBeforeClose">
        <van-radio-group v-model="cheHuiSelectV" @change="cheHuiSelect($event)">
          <van-cell-group title="请选择撤回原因">
            <van-cell v-for="item in cheHuiOptions" :key="item" :title="item" clickable @click="cheHuiSelectV = item">
              <template #right-icon>
                <van-radio :name="item" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <div v-show="showReason" style="border: 1px solid #ccc; margin: 0.1rem 0; ">
          <van-cell-group>
            <van-field type="textarea" v-model="cheHuiContent" placeholder="请输入撤回原因..." required clearable
              maxlength="50" />
          </van-cell-group>
        </div>
      </van-dialog>
    </mp-skeleton>
  </div>
</template>

<script>
  import mpInfo from "./MpInfo";
  import api from "../../../components/api";
  import bottomBtn from "../../../components/BottomBtn";
  export default {
    data() {
      return {
        taskId: null,
        mpId: null,
        enableEdit: null,
        verifyState: null,
        tasktypeId: null,
        temporary: false,
        showDelDialog: false,
        zhuXiaoContent: "",
        showCheHuiDialog: false,
        showReason: false,
        cheHuiSelectV: null,
        cheHuiOptions: ["录入错误", "建筑物已拆除", "其它原因"],
        cheHuiContent: "",
        showStopDialog: false,
        stopVal: "",
        tempData: null,
        noShow: {},
      };
    },
    components: {
      mpInfo,
      bottomBtn
    },
    methods: {
      initData(taskId,
        tasktypeId,
        verifyState) {
        let promise;
        if (taskId) {
          promise = api
            .getTaskTemp(taskId)
            .then(responseData => {
              this.tempData = responseData.data;
              this.mpId = responseData.data.taskTemp.mpId;
            })
          this.taskId = taskId;
          this.tasktypeId = tasktypeId;
          this.verifyState = verifyState;
          switch (verifyState) {
            case -2:
              this.enableEdit = {
                mpPhoto: true,
                bspPhoto: true
              };
              break;
            case 1:
            case -1:
              this.enableEdit = {};
              break;
            case 0:
              this.noShow.bspPhoto = true;
              break;
            default:
              break;
          }
        }
        return promise;
      },
      loadData() {
        const {
          taskId,
          tasktypeId,
          verifyState
        } = this.$route.params;
        return this.initData(taskId,
          tasktypeId,
          verifyState)
      },
      cheHuiBeforeClose(action, done) {
        if (this.showCheHuiDialog) {
          done(false);
        } else {
          done();
        }
      },
      /**未核实提交 */
      clickSubmit() {
        const data = this.$refs.mpInfo.getData();
        if (data.errMsg) {
          this.$toast(data.errMsg);
        } else {
          //检查添加门牌照片
          const photo3 = data.packData.photo3;
          const taskTemp = this.tempData.taskTemp;
          if (
            (!taskTemp.photo3 || taskTemp.photo3.length < 2) &&
            photo3 == null
          ) {
            this.$toast("未上传门牌照片");
            return;
          }
          // 检查门牌号是否已经存在
          const mphm = data.packData.taskButchVos.taskTemp.mphm;
          if (mphm != taskTemp.mphm) {
            const roadName = data.packData.taskButchVos.taskTemp.roadName;
            api
              .getMpExist(roadName, mphm)
              .then(() => {
                this.$toast("该门牌号码已存在，请重新输入");
              })
              .catch(error => {
                if (error.status && error.status == 202) {
                  api.mpHandle(photo3, data.packData.taskButchVos).then(() => {
                    this.$toast.success("提交成功");
                    this.successBack();
                  });
                }
              });
          } else {
            api.mpHandle(photo3, data.packData.taskButchVos).then(() => {
              this.$toast.success("提交成功");
              this.successBack();
            });
          }
        }
      },

      /**中止 */
      clickZhongZhi() {
        this.showStopDialog = true;
      },
      handelStop() {
        api.taskFinish(this.taskId).then(() => {
          this.$toast.success("终止成功");
          this.successBack();
        });
      },
      /**标识牌核实 */
      clickBSPSubmit() {
        const data = this.$refs.mpInfo.getData();
        const photo3 = data.packData.photo3;
        const photo4 = data.packData.photo4;
        if (photo4 == null) {
          this.$toast("未上传标识牌照片");
          return;
        }
        api.taskTemporary(photo3, photo4, this.taskId).then(() => {
          this.$toast.success("提交成功");
          this.successBack();
        });
      },
      /* 撤回 */
      clickCheHui() {
        this.showCheHuiDialog = true;
      },
      /* 注销 */
      clickZhuXiao() {
        this.showDelDialog = true;
      },
      handelDel() {
        api.taskUnverify(this.taskId, this.mpId, this.zhuXiaoContent).then(() => {
          this.$toast.success("注销成功");
          this.successBack();
        });
      },
      handelCheHui() {
        if (this.cheHuiContent.length > 0) {
          this.showCheHuiDialog = false;
          api.taskRollback(this.taskId, this.cheHuiContent).then(() => {
            this.$toast.success("撤回成功");
            this.successBack();
          });
        } else {
          this.showCheHuiDialog = true;
          this.$toast("请选择或输入撤回原因");
        }
      },
      cheHuiSelect(e) {
        this.showReason = false;
        this.cheHuiContent = "";
        this.cheHuiContent = "";
        if (e === "其它原因") {
          this.showReason = true;
        } else {
          this.cheHuiContent = e;
        }
      },

      successBack() {
        this.$store.updateMlpDataState();
        this.$router.back();
      }
    }
  };
</script>

<style lang="less" scoped>
  .delContent {
    border: 1px solid rgb(199, 199, 200);
    margin: 0.2rem;
  }
</style>