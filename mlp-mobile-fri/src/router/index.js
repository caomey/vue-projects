import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "home",
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../views/pages/zhi-pai-he-shi/LouDong.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/home/index.vue"),
      meta: {
        title: "主页",
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login/index.vue"),
      meta: {
        title: "登录",
        noNeedAuth: true,
      },
    },
    {
      path: "/map-location",
      name: "mapLocation",
      component: () => import("../views/pages/map/Location.vue"),
    },
    {
      path: "/pages",
      component: () => import("../views/pages/index.vue"),
      children: [
        {
          path: "zphs",
          name: "zphs",
          component: () => import("../views/pages/zhi-pai-he-shi/index.vue"),
          meta: {
            keepAlive: true,
          },
        },
        {
          path: "add-men-pai",
          name: "addMenPai",
          component: () =>
            import("../views/pages/zhi-pai-he-shi/AddMenPai.vue"),
        },
        {
          path: "edit-men-pai",
          name: "editMenPai",
          component: () =>
            import("../views/pages/zhi-pai-he-shi/EditMenPai.vue"),
        },
        {
          path: "edit-lou-pai",
          name: "editLouPai",
          component: () =>
            import("../views/pages/zhi-pai-he-shi/EditLdInfo.vue"),
        },
        {
          path: "edit-dy-pai",
          name: "editDYPai",
          component: () =>
            import("../views/pages/zhi-pai-he-shi/EditDyInfo.vue"),
        },
        {
          path: "dzgl",
          component: () => import("../views/pages/di-zhi-guan-li/index.vue"),
          meta: {
            topTitle: "地址管理",
          },
        },
        {
          path: "mp-detail",
          name: "mpDetail",
          component: () => import("../views/pages/di-zhi-guan-li/MpDetail.vue"),
        },
        {
          path: "zpaz",
          component: () => import("../views/pages/zhi-pai-an-zhuang/index.vue"),
        },
        {
          path: "zpaz-list",
          name: "zpazList",
          component: () =>
            import("../views/pages/zhi-pai-an-zhuang/InstallList.vue"),
        },
        {
          path: "zpaz-edit",
          name: "zpazEdit",
          component: () =>
            import("../views/pages/zhi-pai-an-zhuang/EditInstall.vue"),
        },
        {
          path: "zpaz-again",
          name: "zpazAgain",
          component: () =>
            import("../views/pages/zhi-pai-an-zhuang/EditInstalled.vue"),
        },
        {
          path: "user",
          component: () => import("../views/pages/user/Info.vue"),
        },
        {
          path: "pwd",
          component: () => import("../views/pages/user/FixPwd.vue"),
        },
        {
          path: "sq",
          name: "SelectCommunity",
          component: () => import("../views/pages/user/SelectCommunity.vue"),
        },
      ],
    },
  ],
});
router.beforeEach((to, from, next) => {
  // 登录拦截
  const noNeedAuth = to.meta && to.meta.noNeedAuth;

  // if (!noNeedAuth) {
  //   if (store.state.userInfo == null) {
  //     // 在页面加载时读取sessionStorage
  //     if (sessionStorage.getItem("store")) {
  //       console.log("get store from sessionStorage");
  //       Object.assign(store.state, JSON.parse(sessionStorage.getItem("store")));
  //     }
  //     if (store.state.userInfo == null) {
  //       console.log("未登录，跳转登录....");
  //       next({
  //         path: "/login",
  //         quiry: {
  //           // 将跳转的路由path作为参数，登录成功后跳转到改路由
  //           redirect: to.fullPath,
  //         },
  //       });
  //       return;
  //     }
  //   }
  // }
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = "门楼牌管理-" + title;
  } else {
    document.title = "门楼牌管理";
  }

  next();
});
export default router;
