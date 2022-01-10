import { Router } from "vue-router";
import { AuthActionTypes } from "../store/auth/action-types";
import { useStore } from "../store";

const beforeConfig = (router: Router) => {
  router.beforeEach((to, from, next) => {
    const store = useStore();
    store.dispatch(AuthActionTypes.setAccessToken);
    store.dispatch(AuthActionTypes.setUserData);
    store.dispatch(AuthActionTypes.checkLogin);
    if (from.name && from.path) {
      store.dispatch(AuthActionTypes.setFromUrl, {
        name: from.name,
        path: from.path,
      });
    }
    next();
  });
};
export default beforeConfig;
