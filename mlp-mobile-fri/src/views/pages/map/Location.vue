<template>
  <div class="flut-box">
    <top-bar top-title="地图选点">
      <template v-slot:right>
        <span
          v-if="editEnable"
          class="bar-commit"
          :class="{'bar-commit-not': !ptFinsh}"
          @click="confimLocation"
        >确认</span>
      </template>
    </top-bar>
    <van-row class="location-msg-box">
      <van-col span="6">
        <i class="iconfont iconweizhi location-msg-icon"></i>
        <span class="location-msg-lable">位置信息：</span>
      </van-col>
      <van-col span="18">
        <transition name="van-slide-right">
          <div v-show="localtionFinsh" style="overflow-x: auto;">
            <span class="location-msg">{{msg}}</span>
          </div>
        </transition>
      </van-col>
    </van-row>
    <map-view style="flex: auto" @start-location="startLocation" @update-pt="updatePt($event)" />
  </div>
</template>

<script>
import topBar from "@/views/pages/TopBar";
import mapView from "../../../components/BMapView";
export default {
  name: "mapLocation",
  data() {
    return {
      localtionFinsh: false,
      msg: "...",
      ptData: {},
      editEnable: false
    };
  },
  computed: {
    ptFinsh() {
      return (
        this.ptData.point && this.ptData.point.lat && this.ptData.point.lat > 0
      );
    }
  },
  components: {
    topBar,
    mapView
  },
  model: {
    prop: "position",
    event: "confim"
  },
  methods: {
    startLocation: function() {
      this.localtionFinsh = false;
      this.ptData = {};
    },
    updatePt: function(data) {
      console.log("updatePt data", data);

      this.ptData = data;
      this.msg = data.address;
      this.localtionFinsh = true;
    },
    confimLocation: function() {
      if (this.ptFinsh) {
        const params = this.$route.params;
        if (params.updateLocation) {
          params.updateLocation(this.ptData.point);
        }
        this.$router.back();
      }
    },
    init(editEnable) {
      this.editEnable = editEnable;
    }
  },
  beforeRouteEnter(to, from, next) {
    const params = to.params;
    next(vm => {
      vm.init(params.editEnable);
    });
  }
};
</script>

<style lang="less" scoped>
.bar-commit {
  color: @backfont;
}

.bar-commit-not {
  color: gray;
}

.map-box {
  bottom: 0;
  width: 100%;
}

.location-msg-box {
  padding: 5px 5px;
}

.location-msg-icon {
  color: Goldenrod;
}

.location-msg-lable {
  color: gray;
  font-weight: lighter;
  font-size: small;
}

.location-msg {
  color: Goldenrod;
  white-space: nowrap;
}

.btn {
  height: auto;
  width: auto;
}
</style>