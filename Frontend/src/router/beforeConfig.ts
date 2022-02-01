import { Router } from "vue-router";
import { AuthActionTypes } from "../store/auth/action-types";
import { useStore } from "../store";

const beforeConfig = (router: Router) => {
  router.beforeEach((to, from, next) => {
    const store = useStore();
    store.dispatch(AuthActionTypes.setAccessToken);
    store.dispatch(AuthActionTypes.setUserData);
    store.dispatch(AuthActionTypes.checkLogin);
    console.log(from.path, from.name);
    if (from.path) {
      let name = from.name;
      let path = from.path;
      if (from.name === "login" || !from.name) {
        name = "home";
        path = "/home";
      }
      store.dispatch(AuthActionTypes.setFromUrl, {
        name,
        path,
      });
    }
    next();
  });
};
export default beforeConfig;
