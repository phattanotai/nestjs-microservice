import { ActionContext, ActionTree } from "vuex";
import { Mutations } from "./mutations";
import { State } from "./state";
import { getters } from "./getters";
import { AuthActionTypes } from "./action-types";
import { AuthMutationType } from "./mutation-types";
import AlertService from "../../service/AlertService";
import CalculateService from "../../service/CalculateService";

import router from "../../router";

import { RootState } from "@/store";
import { RootGetters } from "@/store";

import { USER_LOGIN } from "../../@types";
import authService from "../../service/AuthService";

type ActionAugments = Omit<
  ActionContext<State, RootState>,
  "commit" | "getters"
> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
  rootGetters: {
    [K in keyof RootGetters]: ReturnType<RootGetters[K]>;
  };
};

export type Actions = {
  [AuthActionTypes.doLogin](
    context: ActionAugments,
    loginData: USER_LOGIN
  ): void;

  [AuthActionTypes.doLogout](context: ActionAugments): void;
  [AuthActionTypes.setAccessToken](context: ActionAugments): void;
  [AuthActionTypes.setRememberData](context: ActionAugments): void;
  [AuthActionTypes.setUserData](context: ActionAugments): void;
  [AuthActionTypes.setFromUrl](context: ActionAugments, url: any): void;
  [AuthActionTypes.toggleSidebar](context: ActionAugments): void;
  [AuthActionTypes.updateLanguage](context: ActionAugments, lang: string): void;
  [AuthActionTypes.checkLogin](context: ActionAugments): void;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const actions: ActionTree<State, RootState> & Actions = {
  async [AuthActionTypes.doLogin](context, loginData: USER_LOGIN) {
    const data = await authService.login(loginData);
    if (data.accessToken) {
      context.commit(AuthMutationType.loginStart);
      const rememberData: USER_LOGIN = {
        remember: false,
        username: "",
        password: "",
      };
      rememberData.remember = loginData.remember;
      if (loginData.remember) {
        rememberData.username = CalculateService.base64_encode(
          loginData.username
        );
        rememberData.password = CalculateService.base64_encode(
          loginData.password
        );
      } else {
        rememberData.username = "";
        rememberData.password = "";
      }
      localStorage.setItem("rememberData", JSON.stringify(rememberData));
      context.commit(AuthMutationType.setRememberData, rememberData);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem(
        "userData",
        CalculateService.base64_encode(JSON.stringify(data.userData))
      );
      context.commit(AuthMutationType.updateAccessToken, data.accessToken);
      context.commit(AuthMutationType.setUserData, data.userData);
      AlertService.Success(context.rootGetters.getAuthCaption.success_login);
      router.push("/home");
    } else {
      AlertService.Warning(context.rootGetters.getAuthCaption.warning_login);
      context.commit(AuthMutationType.loginStop);
    }
  },

  [AuthActionTypes.doLogout](context) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    context.commit(AuthMutationType.logout, "");
    router.push("/auth/login");
    if (context.rootGetters.getLogin) {
      AlertService.Info(context.rootGetters.getAuthCaption.success_logout);
    }
    context.commit(AuthMutationType.loginStop, false);
  },
  [AuthActionTypes.setAccessToken]({ commit }) {
    commit(
      AuthMutationType.updateAccessToken,
      localStorage.getItem("accessToken")
    );
  },
  [AuthActionTypes.setRememberData]({ commit }) {
    const data = localStorage.getItem("rememberData") || "";
    if (data) {
      const rememberData = JSON.parse(data);
      if (rememberData.remember) {
        rememberData.username = CalculateService.base64_decode(
          rememberData.username
        );
        rememberData.password = CalculateService.base64_decode(
          rememberData.password
        );
      }
      commit(AuthMutationType.setRememberData, JSON.parse(data));
    }
  },
  [AuthActionTypes.setUserData]({ commit }) {
    const data = localStorage.getItem("userData");
    if (data) {
      commit(
        AuthMutationType.setUserData,
        JSON.parse(CalculateService.base64_decode(data))
      );
    }
  },
  [AuthActionTypes.setFromUrl]({ commit }, url) {
    commit(AuthMutationType.setFromUrl, url);
  },
  [AuthActionTypes.toggleSidebar]({ commit }) {
    commit(AuthMutationType.setSideBar);
  },
  [AuthActionTypes.updateLanguage](context, lang) {
    const d = context.rootGetters.getUserData;
    let role = "user";
    if (d) {
      role = d.role;
    }
    const data = {
      language: lang,
      role,
    };
    context.commit(AuthMutationType.setLanguage, data);
  },
  async [AuthActionTypes.checkLogin]({ commit, rootGetters }) {
    if (rootGetters.getToken) {
      const data = await authService.getUserProfile();
      if (data) {
        localStorage.setItem(
          "userData",
          CalculateService.base64_encode(JSON.stringify(data))
        );
        commit(AuthMutationType.loginStart);
      }
    }
  },
};
