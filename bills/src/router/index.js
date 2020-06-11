import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import money from "../views/money.vue";
import tags from "../views/tags.vue";
import bill from "../views/bill.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/money",
  },
  {
    path: "/money",
    component: money,
  },
  {
    path: "/tags",
    component: tags,
  },
  {
    path: "/bill",
    component: bill,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
