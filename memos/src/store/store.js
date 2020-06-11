import Vue from "vue";
import Vuex from "vuex";
import storage from "../storage/index.js";
let localstore = storage.store;

Vue.use(Vuex);

let initmMemos = localstore.memos;
const store = new Vuex.Store({
  state: {
    isShow: false, // 编辑页面出现的开关
    categoryDropdown: false, // 导航栏下拉框
    sortbyDropdown: false, // 导航栏下拉框
    editInfo: "", // 编辑信息
    memos: localstore.memos, // 本地存储的笔记
    filteredMemos: initmMemos,
  },
  mutations: {},
});

export default store;
