var nav = [];
try {
  nav = require("./nav.js");
} catch (error) {}

module.exports = {
  base: "/vuepress-blog/", // 设置github page 路径
  title: "caomey",
  head: [
    // 注入到当前页面的 HTML <head> 中的标签
    ["link", { rel: "icon", href: "/IronMan.jpg" }], // 增加一个自定义的 favicon(网页标签的图标)
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
    [
      "link",
      { rel: "apple-touch-icon", href: "/icons/apple-touch-icon-152x152.png" },
    ],
    [
      "link",
      {
        rel: "mask-icon",
        href: "/icons/safari-pinned-tab.svg",
        color: "#3eaf7c",
      },
    ],
    [
      "meta",
      {
        name: "msapplication-TileImage",
        content: "/icons/msapplication-icon-144x144.png",
      },
    ],
    ["meta", { name: "msapplication-TileColor", content: "#000000" }],
  ],
  themeConfig: {
    // logo: "/avatar.jpg", // 左上角logo
    nav: [
      // 导航栏配置
      { text: "首页", link: "/" },
      // { text: "blog", link: "/blog/" }
      ...nav,
      { text: "github", link: "https://github.com/caomey?tab=repositories" },
    ],
    // sidebar: "auto", // 生成侧边栏, 使用auto sidebar插件可以取消这个
    sidebarDepth: 2,
    lastUpdated: "更新时间", // 更新时间
  },
  plugins: {
    "vuepress-plugin-auto-sidebar": {
      nav: true,
    },
    "@vuepress/pwa": {
      serviceWorker: true,
      updatePopup: {
        message: "发现新内容可用",
        buttonText: "刷新",
      },
    },
  },
};
