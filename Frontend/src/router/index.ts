import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import routes from "./routes";
import beforeConfig from "./beforeConfig";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

beforeConfig(router);

export default router;
