<template>
  <div id="app">
    <keep-alive include="mapLocation">
      <router-view style="height: 100%;" />
    </keep-alive>
    <van-overlay z-index="99999" :show="$store.state.topOverlayShow" class-name="top-overlay">
      <div class="top-wrapper" v-show="$store.state.topOverlayFlag">
        <div class="van-toast van-toast--middle van-toast--loading">
          <div class="van-loading van-loading--circular van-toast__loading">
            <span class="van-loading__spinner van-loading__spinner--circular">
              <svg viewBox="25 25 50 50" class="van-loading__circular">
                <circle cx="50" cy="50" r="20" fill="none" />
              </svg>
            </span>
          </div>
          <div class="van-toast__text">加载中...</div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
export default {
  mounted() {
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  }
};
</script>



<style lang="less">
#app {
  box-sizing: border-box;
  max-width: @max-width;
  height: 100%;
  margin: 0 auto;
  position: relative;
}
.top-overlay {
  background-color: transparent !important;
}
.top-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.col-table {
  display: table;
  text-align: center;
  height: 100%;
}

.cell-box {
  display: table-cell;
  vertical-align: middle;
}

.bar-box {
  background-color: @primary;
  height: @bar-height;
  min-height: @bar-min-height;
  width: 100%;
  max-width: @max-width;
}

.top-bar-left {
  color: @backfont;
  font-weight: 500;
  font-size: 1.5rem !important;
}

.bar-placeholder {
  height: @bar-height;
  min-height: @bar-min-height;
}

.remind-placeholder {
  height: @remind-line-height;
}

.max-box {
  width: 100%;
  height: 100%;
}

.drop-cell-select-value {
  color: rgb(44, 45, 46) !important;
}

.fild-drop-box {
  position: absolute;
  z-index: 3;
  width: 100%;
  min-height: 40px;
  max-height: 40vh;
  overflow: auto;
  background-color: @backfont;
  border: 1px solid rgb(155, 151, 151);
  top: 32px;
}

.hide-pen {
  width: 100vw;
  max-width: @max-width;
  height: 1000vh;
  position: absolute;
  z-index: 0;
  overflow: visible;
  bottom: 0;
}

.hide-pen-bottom {
  position: absolute;
  z-index: 1;
  width: 100vw;
  max-width: @max-width;
  height: 1000vh;
  overflow: visible;
}

.no-option-msg {
  text-align: center;
  color: @border-color;
  line-height: 0.5rem;
}

.cell-group-padding {
  top: @padding-top;
  margin-top: @padding-top;
}

.bottom-div {
  height: @padding-top;
  width: 100%;
}
.mp-cell-box {
  background-color: @border-color;
}
.cell-info-box {
  background-color: @border-color;
}

.mlp-btn-group {
  display: flex;
  justify-content: space-around;
}

.mlp-btn-group-btn {
  flex: 1;
}

.van-field__label {
  font-weight: bold;
}

.van-cell-label .van-cell__title {
  font-weight: bold;
}

.flut-box {
  display: -webkit-box;
  display: -webkit-box;
  display: flex;
  flex-direction: column;
}
.scroll-tabs {
  flex: auto;
  .van-tabs__content {
    overflow-y: scroll;
  }
}
.text-center {
  text-align: center;
}
.upload-title {
  color: rgb(44, 112, 241);
  margin-bottom: 10px;
}
// ::-webkit-scrollbar {
//   /*隐藏滚轮*/
//   display: none;
// }
</style>