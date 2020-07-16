<template>
  <div>
    <img width="100%" src="../../assets/Homepage.png" />
    <i class="iconfont iconyonghu1 user" @click="goToUser"></i>
    <div class="menu-box"></div>
    <van-grid column-num="2">
      <template v-for="menu in menus">
        <!-- v-if="hasRole(menu.role)" -->
        <van-grid-item :key="menu.title">
          <router-link :to="menu.to">
            <van-image :src="menu.img" />
          </router-link>
          <span>{{ menu.title }}</span>
        </van-grid-item>
      </template>
    </van-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          title: "制牌核实",
          role: 0,
          to: "/pages/sq?next=/pages/zphs",
          img: require("../../assets/chaxun.png"),
        },
        {
          title: "制牌安装",
          role: 1,
          to: "/pages/zpaz",
          img: require("../../assets/zhaoxiangjijia.png"),
        },
        {
          title: "地址管理",
          role: 0,
          to: "/pages/sq?next=/pages/dzgl",
          img: require("../../assets/jilu.png"),
        },
      ],
    };
  },
  methods: {
    hasRole(role) {
      return role === this.$store.state.userInfo.role;
    },
    goToUser() {
      this.$router.push("/pages/user");
    },
  },
  beforeRouteLeave(to, from, next) {
    // ...
    if (to.name != "login") {
      next();
    } else {
      next(false);
    }
  },
};
</script>

<style scoped>
.user {
  position: absolute;
  top: 2%;
  right: 5%;
  color: white;
  font-size: 2.5rem;
}
</style>
