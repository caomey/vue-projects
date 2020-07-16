import Vue from 'vue'
import App from './App.vue'
import router from './router'
import topBar from "@/views/pages/TopBar.vue";
import bottomBtn from "./components/BottomBtn.vue"
import selectDrop from "./components/SelectDrop"
import inputDrop from "./components/InputDrop"
import remind from "./components/Remind.vue"
import MpSkeleton from "./components/MpSkeleton.vue"
import store from "./store"
import VuePageStack from 'vue-page-stack';
import './assets/iconfont/iconfont.css'
import 'vant/lib/icon/local.css';
Vue.use(VuePageStack, {
    router
});

// Vue.use(Select).use(Option)
import {
    Tab,
    Tabs,
    Grid,
    GridItem,
    Dialog,
    Image,
    Lazyload,
    NavBar,
    Icon,
    Uploader,
    Divider,
    Row,
    Col,
    Cell,
    CellGroup,
    Popup,
    Field,
    Picker,
    Button,
    List,
    Search,
    Tag,
    Skeleton,
    Empty,
    PullRefresh,
    Overlay,
    Loading,
    Toast
} from 'vant';
Vue.use(Grid)
    .use(GridItem)
    .use(Dialog)
    .use(Image)
    .use(Lazyload)
    .use(NavBar)
    .use(Icon)
    .use(Uploader)
    .use(Divider)
    .use(Row)
    .use(Col)
    .use(Cell).use(Tab).use(Tabs).use(PullRefresh).use(Overlay).use(Loading).use(Toast)
    .use(CellGroup).use(Popup).use(Field).use(Picker).use(Button).use(List).use(Search).use(Tag).use(Empty).use(Skeleton)
Toast.setDefaultOptions({
        onOpened() {
            store.state.topOverlayFlag = false
        },
        onClose() {
            store.state.topOverlayFlag = true
        }
    })
    // 全局引入自定义组件
Vue.component("topBar", topBar)
Vue.component("bottomBtn", bottomBtn)
Vue.component("selectDrop", selectDrop);
Vue.component("inputDrop", inputDrop);
Vue.component("remindMsg", remind);
Vue.component("MpSkeleton", MpSkeleton);
Vue.config.productionTip = false
    // if (process.env.VUE_APP_MOCK === '1') {
    //     console.warn('使用 mockjs 拦截 api........');
    //     require('./mock.js')
    // }
Vue.prototype.$store = store;
// if (process.env.NODE_ENV === 'development') {
//     var ua = window.navigator.userAgent.toLowerCase();
//     if (ua.match(/MicroMessenger/i) == 'micromessenger') {
//         // 是微信端
//         const src = '//cdn.jsdelivr.net/npm/eruda';
//         document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
//         document.write('<scr' + 'ipt>eruda.init();</scr' + 'ipt>');
//     }

// }
new Vue({
    router,
    render: h => h(App),
    store
}).$mount('#app')