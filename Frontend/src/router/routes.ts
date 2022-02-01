import { RouteRecordRaw } from "vue-router";

import AuthLayout from "../components/Layout/AuthLayout.vue";
import DashboardLayout from "../components/Layout/DashboardLayout.vue";
import NotFound from "../views/NotFound.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/auth",
    name: "auth",
    component: AuthLayout,
    children: [
      {
        path: "/auth/login",
        name: "login",
        component: () => import("../views/Login.vue"),
      },
      {
        path: "/auth/register",
        name: "register",
        component: () => import("../views/Register.vue"),
      },
      {
        path: "/auth/repassword",
        name: "repassword",
        component: () => import("../views/Repassword.vue"),
      },
      {
        path: "/auth:pathMatch(.*)*",
        redirect: { name: "login" },
      },
      {
        path: "/auth/",
        redirect: { name: "login" },
      },
    ],
  },
  {
    path: "/",
    redirect: "dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("../views/Dashboard.vue"),
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("../views/UserProfile.vue"),
      },
      {
        path: "/reports",
        name: "reports",
        component: () => import("../views/Reports.vue"),
      },
      {
        path: "/products",
        name: "products",
        component: () => import("../views/Products.vue"),
      },
      {
        path: "/about",
        name: "about",
        component: () => import("../views/About.vue"),
      },
    ],
  },
  {
    name: "NotFound",
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

export default routes;
