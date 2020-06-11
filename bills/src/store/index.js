import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tags: [],
    bills: [],
    currentAmount: "0",
    notes: "",
    selectedTags: "",
    types: "-",
  },
  mutations: {
    initTags(state) {
      if (localStorage.getItem("tags") === null) {
        state.tags = ["吃饭", "购物", "打车", "游戏充值", "工资", "兼职"];
        this.commit("saveTags");
      } else {
        this.commit("fetchTags");
      }
      // state.selectedTags = this.tags[0];
    },
    // 持久化
    fetchTags(state) {
      state.tags = JSON.parse(localStorage.getItem("tags"));
    },
    saveTags(state) {
      localStorage.setItem("tags", JSON.stringify(state.tags));
    },
    // 增删改查
    addTags(state) {
      let tag = prompt("请输入标签");
      if (state.tags.indexOf(tag) >= 0) {
        alert("该标签已存在！");
      } else if (!tag) {
        alert("标签输入为空，请重新输入！");
      } else {
        console.log("新增标签：", tag);
        state.tags.push(tag);
        this.commit("saveTags");
      }
    },
    removeTags(state, tag) {
      console.log("删除标签：", tag);
      state.tags.splice(state.tags.indexOf(tag), 1);
      this.commit("saveTags");
    },
    updateTags(state, tag) {
      let newTag = prompt("请修改标签");
      console.log("修改标签为：", newTag);
      state.tags.splice(state.tags.indexOf(tag), 1, newTag);
      this.commit("saveTags");
    },
    initBills(state) {
      if (localStorage.getItem("bills") !== null) {
        this.commit("fetchBills");
      } else {
        localStorage.setItem("bills", "[]");
      }
    },
    fetchBills(state) {
      state.bills = JSON.parse(localStorage.getItem("bills"));
    },
    saveBills(state) {
      localStorage.setItem("bills", JSON.stringify(state.bills));
    },
    addBills(state, obj) {
      state.bills.push(obj);
      this.commit("saveBills");
      alert("账单创建成功！");
    },
  },
});
