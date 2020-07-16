<template>
  <div class="flut-box">
    <top-bar>
      <template v-slot:middle>
        <van-row>
          <van-col span="16" class="col-table">
            <form action="/" class="cell-box">
              <van-search
                v-model="searchValue"
                shape="round"
                placeholder="请输入搜索关键词"
                class="search-box"
                @search="onSearch"
              >
                <van-icon slot="left-icon" name="search" @click="onSearch"></van-icon>
              </van-search>
            </form>
          </van-col>
          <van-col span="8" class="col-table">
            <div class="cell-box">
              <div class="oddEvenNumber">
                <select class="select-a" v-model="dsh" @change="dshSelectChange">
                  <option value>单双混</option>
                  <option value="1">单号</option>
                  <option value="0">双号</option>
                </select>
              </div>
            </div>
          </van-col>
        </van-row>
      </template>

      <template v-slot:right>
        <div @click="toAddMp">
          <i class="iconfont iconadd left-add"></i>
        </div>
      </template>
    </top-bar>
    <map-view style="width:100%;height:200px"></map-view>
    <van-tabs
      ref="tabs"
      v-model="tabActive"
      color="#2c70f1"
      title-active-color="#2c70f1"
      @change="judgeRefreshTab"
      class="scroll-tabs"
    >
      <van-tab
        v-for="tab in tabList"
        :key="tab.title"
        :title="tab.title"
        :style="{height:scrollHeight}"
      >
        <van-pull-refresh v-model="tab.refreshing" @refresh="tab.onRefresh">
          <van-list
            v-model="tab.loading"
            :finished="tab.finished"
            finished-text="没有更多了"
            :error.sync="tab.error"
            error-text="请求失败，点击重新加载"
            @load="tab.load"
          >
            <div
              v-for="item in tab.data"
              class="mp-msg-box van-hairline--bottom van-ellipsis"
              :key="item.taskId"
              @click="toDetail(item,tab)"
            >
              <span>{{packageMpMsg(item)}}</span>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from "vue";
import topBar from "../TopBar";
import mapView from "../../../components/BMapView";
import { DropdownMenu, DropdownItem } from "vant";
import api from "../../../components/api";
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
export default {
  name: "zphs",
  data() {
    return {
      isCurrentReload: false,
      tabActive: 0,
      searchValue: "",
      field: "",
      tabList: [],
      dsh: "",
      scrollHeight: ""
    };
  },
  components: {
    topBar,
    mapView
  },
  methods: {
    onSearch() {
      this.field = this.searchValue;
      this.judgeRefreshTab();
    },
    dshSelectChange() {
      this.judgeRefreshTab();
    },
    judgeRefreshTab() {
      const tab = this.tabList[this.tabActive];
      if (tab.dsh != this.dsh || tab.field != this.field) {
        tab.dsh = this.dsh;
        tab.field = this.field;
        tab.data = [];
        tab.loading = false;
        tab.finished = false;

        tab.onRefresh();
      } else if (tab.refreshing) {
        tab.onRefresh();
      }
    },
    toAddMp() {
      this.$router.push({
        name: "addMenPai",
        params: {}
      });
    },
    toLocation(setLocation) {
      this.setLocation = setLocation;
      this.locationView.load = true;
      this.$router.push(this.locationView.path);
    },
    confimLocation(ptData) {
      if (this.setLocation) {
        this.setLocation(ptData.point);
      }
    },
    toDetail(mpData, tab) {
      const { taskId, tasktypeId } = mpData;
      const verifyState = tab.verifyState;
      this.$router.push({
        name: "editMenPai",
        params: {
          taskId,
          tasktypeId,
          verifyState
        }
      });
    },
    packageMpMsg(mpData) {
      let msg = mpData.szsq ? mpData.szsq : "";
      msg += mpData.roadName ? mpData.roadName : "";
      msg += mpData.mphm ? mpData.mphm + "号" : "";
      msg += mpData.buildname ? mpData.buildname : "";
      return msg;
    }
  },

  created() {
    const self = this;

    function MpTab(title, verifyState) {
      this.title = title;
      this.field = self.field;
      this.dsh = self.dsh;
      this.loading = false;
      this.finished = false;
      this.verifyState = verifyState;
      this.refreshing = true;
      this.error = false;
      // 分页
      this.currentPage = 1;
      this.data = [];
      this.load = () => {
        // type:2按核实状态搜索
        const type = 2;
        // for (let index = 0; index < 20; index++) {
        //   const element = {
        //     taskId: index,
        //     szsq: index + 'szsq'
        //   };
        //   this.data.push(element)
        // }
        // console.log('this.data', this.data);

        // this.finished = this.loading = true;
        api
          .getMpList(this.currentPage, this.field, verifyState, type, this.dsh)
          .then(response => {
            if (this.refreshing) {
              this.refreshing = false;
            }
            this.data = this.data.concat(response.data);
            this.finished = response.finished;
            this.currentPage++;
            // self.$nextTick(() => {
            //   const ref = self.$refs[refName][0]
            //   // loading 高度50
            //   const listHeight = ref.$el.offsetHeight - 50;
            //   if (listHeight < ref.$parent.$el.offsetHeight) {
            //     this.loading = false;
            //   } else {
            //     this.loading = true;
            //   }
            // })
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
            this.error = true;
            if (this.refreshing) {
              this.refreshing = false;
            }
          });
      };
      this.onRefresh = () => {
        this.currentPage = 1;
        this.loading = true;
        this.finished = false;
        this.data = [];
        this.load();
      };
    }

    this.tabList = [
      new MpTab("未核实", 0),
      new MpTab("标识牌", -2),
      new MpTab("已核实", 1),
      new MpTab("已注销", -1)
    ];
  },
  mounted() {
    const tabs = this.$refs.tabs.$el;
    const tabsHeight = tabs.offsetHeight;
    const tabsWrapHeight = tabs.firstChild.offsetHeight;
    this.scrollHeight = tabsHeight - tabsWrapHeight + "px";
  },
  watch: {
    "$store.state.mlpDataState": function() {
      this.tabList.forEach(tab => {
        tab.data = [];
        tab.loading = false;
        tab.finished = false;
        tab.refreshing = true;
      });
      this.judgeRefreshTab();
    }
  }
};
</script>

<style lang="less" scoped>
.search-box {
  padding: 0;
  background-color: transparent;
}

.search-box input {
  text-indent: 10px;
}

.search-box .van-cell {
  line-height: normal;
}

.search-input {
  border-radius: 10px;
  color: black;
  border: 0 none;
  background-color: rgba(225, 225, 225, 0.5);
  font-size: 0.14rem;
  padding-top: 5px;
  padding-bottom: 5px;
  text-indent: 10px;
  width: 100%;
}

.select-a {
  padding: 4px 5px 7px 5px;
  border-radius: 17px;
  background-color: @backfont;
  outline: none;
  text-align: center;
  text-align-last: center;
}

.left-add {
  color: @backfont;
  font-size: 1.4rem;
  font-weight: 500;
}

.mp-msg-box {
  padding: 15px 5px 15px 5px;
  text-align: left;
}
</style>