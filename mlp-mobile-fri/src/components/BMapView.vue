<template>
  <div style="position:relative;" class="bmap-box">
    <div style="width: 100%;" :style="{height: mapHeight}" ref="mapEl"></div>
    <transition name="van-slide-left">
      <img
        class="lg-map-location"
        v-show="locationVisible"
        src="../assets/location.png"
        @click="doDingWei"
      />
    </transition>
    <transition name="van-slide-down">
      <img
        src="../assets/position-picker.png"
        class="lg-position-picker"
        alt="定位"
        ref="mapPickerEl"
        v-show="pickerVisible"
      />
    </transition>
    <div class="lg-map-point">[{{point.lat ? point.lat+','+point.lng : '0,0'}}]</div>
    <van-overlay :show="reloadMapBoxShow" z-index="999" style="position: absolute;">
      <div class="wrapper col-table" style="width:100%" @click.stop="loadMap">
        <div class="cell-box">
          <span style="color:white">地图载入失败！</span>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
function asyncLoadBaiduJs() {
  return new Promise((resolve, reject) => {
    if (typeof BMap !== "undefined") {
      resolve(BMap);
      return true;
    }
    console.log("bmp loading...");
    window.onBMapCallback = function() {
      console.log("bmp load finsh");

      resolve(BMap);
    };
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "//api.map.baidu.com/api?v=3.0&ak=CORF3XFUpvZGZdlilSby8K0E41hxB5aF&callback=onBMapCallback";
    script.onerror = err => reject(err);
    document.body.appendChild(script);
  });
}
export default {
  name: "bmapView",
  data() {
    return {
      myMap: null,
      geolocation: null,
      geoc: null,
      point: {},
      pickerVisible: true,
      locationVisible: true,
      reloadMapBoxShow: false,
      loadCenterFinsh: false,
      mapHeight: ""
    };
  },
  methods: {
    // 加载中心点
    loadCenter() {
      if (this.loadCenterFinsh) {
        return;
      }
      if (this.myMap === null) {
        console.warn("地图还未加载。。。");
        console.warn("重新加载地图！！！");
        this.loadMap();
        return;
      }
      const mapEl = this.$refs.mapEl;
      if (!mapEl) {
        console.warn("地图div未加载。。。");
        return;
      }
      const _this = this;
      // 不可见
      if (mapEl.offsetParent === null) {
        return;
      }
      try {
        const myCity = new BMap.LocalCity();
        _this.geolocation = new BMap.Geolocation();
        _this.geoc = new BMap.Geocoder();
        myCity.get(result => {
          _this.myMap.centerAndZoom(result.name, _this.centerAndZoom.zoom);
          const centerPixel = _this.myMap.pointToOverlayPixel(
            _this.myMap.getCenter()
          );
          _this.movePickerTocenter(centerPixel);
          _this.loadCenterFinsh = true;
          _this.doDingWei();
        });

        // 地图拖拽完成
        _this.myMap.addEventListener("dragend", function() {
          if (_this.loadCenterFinsh) {
            const centerPoint = _this.myMap.getCenter();
            _this.getLocation(centerPoint);
          }
        });
      } catch (error) {
        console.error("初始地图异常", error);
        if (_this.myMap) {
          // _this.myMap.centerAndZoom("深圳", _this.centerAndZoom.zoom);
          const mapPickerEl = _this.$refs.mapPickerEl;
          mapPickerEl.style.visibility = "visible";
        }
      }
    },
    movePickerTocenter(centerPixel) {
      const mapPickerEl = this.$refs.mapPickerEl;
      if (mapPickerEl) {
        mapPickerEl.style.left =
          centerPixel.x - mapPickerEl.offsetWidth / 2 + "px";
        mapPickerEl.style.top = centerPixel.y - mapPickerEl.offsetHeight + "px";
        mapPickerEl.style.visibility = "visible";
      } else {
        console.warn("mapPickerEl is empty ", this.$refs);
      }
    },
    // 公众号定位需要https访问
    doDingWei() {
      if (this.loadCenterFinsh === false) {
        this.loadCenter();
        return;
      }
      console.log("doDingWei....");
      const _this = this;
      _this.$emit("start-location");
      _this.locationVisible = false;
      _this.pickerVisible = false;
      _this.geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          _this.myMap.panTo(r.point);
          _this.movePickerTocenter(r.point);
          const address =
            r.address.province +
            r.address.city +
            r.address.district +
            r.address.street +
            r.address.street_number;
          _this.updateLocation({
            addressC: r.address,
            point: r.point,
            address: address
          });
        } else {
          _this.$toast.fail("定位失败,请重试");
          console.log("精准定位失败status", this.getStatus());
        }
        _this.locationVisible = true;
        _this.pickerVisible = true;
      });
    },
    getLocation(pt) {
      const _this = this;
      _this.movePickerTocenter(pt);
      _this.$emit("start-location");
      _this.pickerVisible = false;
      _this.geoc.getLocation(pt, function(r) {
        _this.updateLocation({
          addressC: r.addressComponents,
          point: r.point,
          address: r.address
        });
      });
    },
    updateLocation(data) {
      this.$emit("update-pt", data);
      this.point = {
        ...data.point
      };
      this.pickerVisible = true;
    },
    loadMap() {
      const _this = this;
      const mapEl = this.$refs.mapEl;
      asyncLoadBaiduJs()
        .then(() => {
          // 地图已经加载
          if (_this.myMap === null) {
            console.log("初始化map。。。");
            _this.myMap = new BMap.Map(mapEl);
            _this.myMap.centerAndZoom("深圳", _this.centerAndZoom.zoom);
            // 地图拖拽开始
            _this.myMap.addEventListener("dragstart", function() {
              if (_this.loadCenterFinsh === false) {
                _this.loadCenter();
                return false;
              }
            });
            _this.reloadMapBoxShow = false;
          }
          setTimeout(() => {
            _this.loadCenter();
          }, 500);
        })
        .catch(err => {
          this.reloadMapBoxShow = true;
          console.log("地图加载失败", err);
        });
    }
  },
  props: {
    centerAndZoom: {
      type: Object,
      default: function() {
        return {
          x: 114.08576007734023,
          y: 22.55937393652498,
          zoom: 15
        };
      }
    }
  },
  mounted() {
    const mapEl = this.$refs.mapEl;
    console.log({
      mapEl
    });

    this.mapHeight = mapEl.parentElement.offsetHeight + "px";
    console.log("this.mapHeight", this.mapHeight);

    this.loadMap();
  }
};
</script>

<style>
.anchorBL {
  display: none;
}

.lg-map-location {
  position: absolute;
  z-index: 99;
  left: 0;
  bottom: 20%;
  background-color: rgb(0, 0, 0, 0.5);
}

.lg-position-picker {
  position: absolute;
  z-index: 99;
  visibility: hidden;
  /* margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0; */
}

.lg-map-point {
  position: absolute;
  z-index: 99;
  right: 0;
  bottom: 0;
  background-color: rgb(0, 0, 0, 0.1);
  color: gray;
  text-align: left;
  font-size: 10px;
}
</style>