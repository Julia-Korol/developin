import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import EmployeesPage from "../views/EmployeesPage.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: EmployeesPage,
  },
  {
    path: "/employee/:id",
    name: "DetailPage",
    component: () => import("../views/EmployeeDetailPage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
