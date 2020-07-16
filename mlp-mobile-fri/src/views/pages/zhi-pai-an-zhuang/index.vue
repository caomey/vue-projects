<template>
  <div class="flut-box">
    <top-bar top-title="制牌安装批次" />
    <van-tabs
      animated
      color="#2c70f1"
      title-active-color="#2c70f1"
      class="scroll-tabs"
      ref="tabs"
      v-if="$store.state.installDataState == installDataState"
    >
      <van-tab title="待安装数据" :style="{height:scrollHeight}">
        <mp-skeleton title :row="10" :async-load="installLoad" is-refresh>
          <div
            v-for="item in taskinstallListFilter"
            class="install-cell-box"
            :key="item.taskId"
            @click="installToDetail(item)"
          >
            <van-row>
              <van-col span="4" class="text-center">
                <i class="iconfont iconwenjianjia install-icon"></i>
              </van-col>
              <van-col span="16" class="install-msg">{{item.number}}</van-col>
              <van-col span="4" class="install-msg">{{item.installedCount}}/{{item.installingCount}}</van-col>
            </van-row>
          </div>
        </mp-skeleton>
      </van-tab>
      <van-tab title="未通过数据">
        <mp-skeleton title :row="10" :async-load="installedLoad">
          <van-list
            v-model="installedLoading"
            :finished="installedFinished"
            finished-text="没有更多了"
            :error.sync="installedError"
            error-text="请求失败，点击重新加载"
            @load="installedLoad"
          >
            <div
              v-for="item in taskinstalledList"
              class="install-cell-box"
              :key="item.taskId"
              @click="toInstalled(item)"
            >
              <van-row>
                <van-col span="4" class="text-center">
                  <i class="iconfont iconwenjianjiakai install-item-icon"></i>
                </van-col>
                <van-col span="20" class="install-item-number">{{packMsg(item)}}</van-col>
              </van-row>
            </div>
          </van-list>
        </mp-skeleton>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import api from "../../../components/api";
export default {
  data() {
    return {
      taskinstallList: null,
      scrollHeight: "",
      taskinstalledList: null,
      installedCurrentPage: 1,
      installedLoading: false,
      installedFinished: false,
      installedError: false,
      installDataState: this.$store.state.installDataState
    };
  },
  computed: {
    taskinstallListFilter() {
      if (this.taskinstallList) {
        return this.taskinstallList.filter(item => {
          return item.installingCount > 0;
        });
      } else {
        return null;
      }
    }
  },
  mounted() {
    const tabs = this.$refs.tabs.$el;
    const tabsHeight = tabs.offsetHeight;
    const tabsWrapHeight = tabs.firstChild.offsetHeight;
    this.scrollHeight = tabsHeight - tabsWrapHeight + "px";
  },
  activated() {
    this.installDataState = this.$store.state.installDataState;
  },
  methods: {
    installToDetail(item) {
      this.$router.push({
        name: "zpazList",
        params: {
          installData: item,
          feedBack: () => {
            const count = item.installingCount - 1;
            this.$set(item, "installingCount", count);
          }
        }
      });
    },
    installRefresh() {
      this.taskinstallList = [];
      this.installLoad();
    },
    installLoad() {
      return api.taskInstallList().then(responseData => {
        this.taskinstallList = responseData.data;
      });
    },
    installedRefresh() {
      this.installedCurrentPage = 1;
      this.taskinstalledList = [];
      this.installedLoad();
    },
    installedLoad() {
      return api
        .installedList({ currentPage: this.installedCurrentPage })
        .then(responseData => {
          this.installedLoading = false;
          this.installedFinished = responseData.finished;
          this.taskinstalledList = responseData.data;
          this.installedCurrentPage++;
        })
        .catch(err => {
          console.error({
            err
          });
          this.installedLoading = false;
          this.installedError = true;
          throw err;
        });
    },
    packMsg(record) {
      return record.szjd + record.szsq + record.roadName + record.mphm + "号";
    },
    toInstalled(item) {
      this.$router.push({
        name: "zpazAgain",
        params: {
          temp: item
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@cell-height: 2rem;

.install-cell-box {
  height: @cell-height;
  border-bottom: 1px solid @border-color;
  padding: 5px 0 5px 0;
}
.install-item-icon {
  color: rgb(255, 204, 102);
  font-size: @cell-height;
  line-height: @cell-height;
}
.install-item-number {
  line-height: @cell-height;
}
.install-icon {
  font-size: @cell-height;
  color: rgb(255, 213, 129);
  line-height: @cell-height;
}

.install-msg {
  line-height: @cell-height;
}
</style>