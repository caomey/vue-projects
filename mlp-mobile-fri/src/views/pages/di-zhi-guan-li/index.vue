<template>
  <div>
    <top-bar>
      <template v-slot:middle>
        <van-row>
          <van-col span="16" class="col-table">
            <form action="/" class="cell-box">
              <van-search
                v-model="searchValue"
                @click="searchClick"
                :clearable="false"
                shape="round"
                placeholder="请输入门牌或路名"
                class="search-box"
                @search="onSearch"
                @input="inputChange"
              >
                <i slot="left-icon" class="iconfont" :class="searchTypeIcon" @click.stop="onSearch"></i>
                <van-icon slot="right-icon" name="search" @click.stop="onSearch"></van-icon>
              </van-search>
              <div class="more--wrapp" v-show="roadNameListShow">
                <div class="road-name-list">
                  <div
                    v-for="item in roadNameOptions"
                    :key="item.roadName"
                    class="van-hairline--bottom"
                  >
                    <van-cell
                      clickable
                      :border="false"
                      :title="item.roadName"
                      @click.stop="roadNameClick(item)"
                    />
                  </div>
                  <p class="no-option-msg">没有了</p>
                </div>
                <div
                  class="hide-pen-bottom"
                  @click.stop="roadNameListShow = false"
                  @touchstart="roadNameListShow = false"
                ></div>
              </div>
            </form>
          </van-col>

          <van-col span="8" class="col-table">
            <div class="cell-box">
              <div class="oddEvenNumber">
                <select class="select-a" v-model="szxq">
                  <option value>深圳市</option>
                  <option
                    :value="item.name"
                    v-for="item in szxqList"
                    :key="item.value"
                  >{{item.name}}</option>
                </select>
              </div>
            </div>
          </van-col>
        </van-row>

        <div class="more--wrapp" v-show="moreSerachShow">
          <div class="more-serach-box"></div>
        </div>
      </template>

      <template v-slot:right>
        <div @click="replay">
          <van-icon name="replay" class="left-add" />
        </div>
      </template>
    </top-bar>
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="mpList.length == 0 ? '无匹配结果': '没有更多了'"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="load"
    >
      <div
        v-for="item in mpList"
        class="mp-msg-box van-hairline--bottom van-ellipsis"
        :key="item.mpId"
        @click="toDetail(item)"
      >
        <span>{{packageMpMsg(item)}}</span>
      </div>
    </van-list>
    <van-empty :image="emptySearchImg" description v-show="mpList.length == 0" />
  </div>
</template>

<script>
import { szxqList } from "../../../components/Constant";
import api from "../../../components/api";
import debounce from "lodash/debounce";
import emptySearchImg from "../../../assets/empty-image-search.png";
const searchType = {
  road: "iconlubiao",
  mp: "iconmenpai"
};
export default {
  data() {
    return {
      searchValue: "",
      szxq: "",
      szxqList,
      moreSerachShow: false,
      roadNameListShow: false,
      loading: false,
      finished: true,
      mpList: [],
      roadNameOptions: [],
      currentPage: 1,
      roadName: "",
      mphm: "",
      searchTypeIcon: "",
      error: false,
      emptySearchImg
    };
  },
  methods: {
    onSearch() {
      this.roadNameListShow = false;
      this.mpList = [];
      this.currentPage = 1;
      this.loading = true;
      this.finished = false;
      this.mphm = "";
      this.roadName = "";
      if (this.searchTypeIcon === searchType.road) {
        this.roadName = this.searchValue;
      } else if (this.searchTypeIcon === searchType.mp) {
        this.mphm = this.searchValue;
      }
      this.load();
    },
    replay() {
      Object.assign(this.$data, this.$options.data());
    },
    load() {
      api
        .mpManageList(
          {
            currentPage: this.currentPage,
            pageSize: 30
          },
          this.roadName,
          this.mphm,
          this.szxq
        )
        .then(reponseData => {
          this.currentPage++;
          this.loading = false;
          this.finished = reponseData.finished;
          this.mpList = this.mpList.concat(reponseData.data);
        })
        .catch(err => {
          console.error({
            err
          });
          this.loading = false;
          this.error = true;
        });
    },
    toDetail(item) {
      this.$router.push({
        name: "mpDetail",
        params: {
          mpId: item.mpId
        }
      });
    },
    packageMpMsg(mpData) {
      let msg = mpData.szsq ? mpData.szsq : "";
      msg += mpData.roadName ? mpData.roadName : "";
      msg += mpData.mphm ? mpData.mphm + "号" : "";
      msg += mpData.buildname ? mpData.buildname : "";
      return msg;
    },
    queryRoad() {
      if (this.searchValue.length > 0) {
        this.roadNameListShow = true;
        api.getRoadName(this.searchValue).then(reponse => {
          this.roadNameOptions = reponse.data;
        });
      }
    },
    roadNameClick(item) {
      this.roadNameListShow = false;
      this.searchValue = item.roadName;
      this.searchTypeIcon = searchType.road;
      console.log(item);
    },
    inputChange() {
      this.roadNameOptions = [];
      this.roadNameListShow = false;
      this.searchTypeIcon = "";
      if (this.searchValue.length == 0) {
        return;
      }
      const firstStr = this.searchValue.substr(0, 1);
      // 针对首个字符非数字为道路名进行搜索
      if (isNaN(firstStr)) {
        this.debouncedQuery();
        return;
      }
      this.searchTypeIcon = searchType.mp;
    },
    searchClick() {
      if (this.roadNameOptions.length > 0) {
        this.roadNameListShow = true;
      }
    }
  },
  created() {
    this.debouncedQuery = debounce(this.queryRoad, 1000);
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

.select-a {
  padding: 4px 5px 7px 5px;
  border-radius: 17px;
  background-color: @backfont;
  outline: none;
  text-align: center;
  text-align-last: center;
}

.mp-msg-box {
  padding: 15px 5px 15px 5px;
  text-align: left;
}

.left-add {
  color: @backfont;
  font-size: 1.4rem;
  font-weight: 500;
}

.more--wrapp {
  position: relative;
}

.more-serach-box {
  position: absolute;
  z-index: 1;
  margin-top: 5px;
  border: 1px solid @border-color;
  height: 100px;
  width: 100%;
  background-color: @backfont;
}

.road-name-list {
  position: absolute;
  z-index: 2;
  border: 1px solid @border-color;
  height: 200px;
  width: 100%;
  overflow-y: scroll;
  background-color: @backfont;
}
</style>