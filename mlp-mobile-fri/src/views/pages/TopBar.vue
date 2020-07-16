<template>
  <div>
    <nav-bar class="header-bar">
      <template v-slot:middle>
        <div class="col-table" style="width:100%;height:100%;">
          <div class="cell-box">
            <slot name="middle">
              <span class="middlle-title">{{topTitle ? topTitle : $route.meta.topTitle}}</span>
            </slot>
          </div>
        </div>
      </template>

      <template v-slot:right>
        <div class="col-table" style="width:100%;height:100%;">
          <div class="cell-box">
            <slot name="right"></slot>
          </div>
        </div>
      </template>
    </nav-bar>
    <div class="bar-placeholder"></div>
    <template v-if="remind">
      <remind-msg />
      <div class="remind-placeholder"></div>
    </template>


  </div>
</template>

<script>
  import navBar from "../../components/NavBar";
  export default {
    name: "topBar",
    components: {
      navBar
    },
    props: {
      topTitle: String,
      remind: {
        type: Boolean,
        default () {
          return false;
        }
      }
    },
  };
</script>

<style lang="less" scoped>
  .header-bar {
    position: fixed;
    top: 0px;
    z-index: 999;
  }

  .middlle-title {
    color: @backfont;
    font-weight: 50;
    font-size: 1rem;
  }
</style>