<template>
  <div>
    <top-bar top-title="制牌安装列表" />
    <div class="install-top-warpper">
      <van-row class="install-top-box">
        <van-col span="4" class="text-center">
          <i class="iconfont iconwenjianjia install-top-icon"></i>
        </van-col>
        <van-col span="20" class="install-top-number">{{installData.number}}</van-col>
      </van-row>
    </div>
    <mp-skeleton title :row="10" :async-load="loadData">
      <div
        v-for="item in installList"
        class="install-cell-box"
        :key="item.taskId"
        @click="toInstall(item)"
      >
        <van-row>
          <van-col span="4" class="text-center">
            <i class="iconfont iconwenjianjiakai install-item-icon"></i>
          </van-col>
          <van-col span="16" class="install-item-number">{{packMsg(item)}}</van-col>
          <van-col span="4" class="text-center" @click.stop="feedBackClick(item)">
            <van-tag color="rgb(236, 160, 137)" round>错误反馈</van-tag>
          </van-col>
        </van-row>
      </div>
      <van-dialog
        v-model="feedbackShow"
        title="错误信息反馈"
        @confirm="$refs.feedback.submit()"
        @cancel="feedbackShow = false"
        show-cancel-button
        :before-close="feedbackBeforeClose"
      >
        <feedback
          :taskId="feedbackTaskId"
          :address="feedbackAddress"
          ref="feedback"
          @success="feedbackSuccess"
        />
      </van-dialog>
    </mp-skeleton>
  </div>
</template>

<script>
import api from "../../../components/api";
import feedback from "./Feedback.vue";
export default {
  data() {
    return {
      installList: null,
      feedbackShow: false,
      feedbackTaskId: null,
      feedbackAddress: null,
      installData: null,
      installDataState: this.$store.state.installDataState
    };
  },
  created() {
    this.installData = this.$route.params.installData;
  },
  activated() {
    if (this.installDataState != this.$store.state.installDataState) {
      this.loadData();
    }
    this.installDataState = this.$store.state.installDataState;
  },
  components: {
    feedback
  },
  methods: {
    loadData() {
      const taskId = this.installData.taskId;
      if (taskId) {
        return api.taskInstallListInfo(taskId).then(responseData => {
          this.installList = responseData.data;
        });
      }
    },
    packMsg(record) {
      return record.szjd + record.szsq + record.roadName + record.mphm;
    },
    toInstall(item) {
      if (!item.address) {
        item.address = item.szjd + item.szsq + item.roadName + item.mphm;
      }
      this.$router.push({
        name: "zpazEdit",
        params: {
          temp: item
        }
      });
    },
    feedBackClick(item) {
      this.feedbackTaskId = item.taskId;
      const streetname = item.szjd ? item.szjd : "";
      this.feedbackAddress =
        streetname + item.szjd + item.szsq + item.roadName + item.mphm;
      this.feedbackShow = true;
    },
    feedbackBeforeClose(action, done) {
      if (this.feedbackShow) {
        done(false);
      } else {
        done();
      }
    },
    feedbackSuccess() {
      this.feedbackShow = false;
      for (let index = 0; index < this.installList.length; index++) {
        const element = this.installList[index];
        if (element.taskId === this.feedbackTaskId) {
          this.$delete(this.installList, index);
          this.$route.params.feedBack();
          return;
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
@cell-height: 1.5rem;
@top-cell-height: 2rem;

.install-top-warpper {
  background-color: @border-color;
  padding: 0 0 5px 0;
}

.install-top-box {
  background-color: @backfont;
  padding: 5px 0 5px 0;
}

.install-cell-box {
  padding: 5px 0 5px 0;
  border-bottom: 1px solid @border-color;
  height: @cell-height;
}

.install-top-icon {
  color: rgb(255, 213, 129);
  font-size: @top-cell-height;
  line-height: @top-cell-height;
}

.install-top-number {
  color: rgb(4, 143, 228);
  font-size: 1.2rem;
  font-weight: 500;
  line-height: @top-cell-height;
}

.install-item-icon {
  color: rgb(255, 204, 102);
  font-size: @cell-height;
  line-height: @cell-height;
}

.install-item-number {
  font-size: 0.8rem;
  font-weight: 500;
  overflow-x: scroll;
  white-space: nowrap;
  line-height: @cell-height;
}
</style>