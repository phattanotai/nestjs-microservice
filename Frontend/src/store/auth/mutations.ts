import { MutationTree } from "vuex";
import { AuthMutationType } from "./mutation-types";
import { State } from "./state";
import { LANGUAGE_TH, LANGUAGE_EN } from "../../assets/caption/authCaption";
import { AM_MENU, US_MENU, CH_MENU } from "../../assets/caption/menuCaption";
import { USER_TYPE } from "../../@types";

export type Mutations = {
  [AuthMutationType.loginStart](state: State, value: boolean): void;
  [AuthMutationType.loginStop](state: State, value: boolean): void;
  [AuthMutationType.logout](state: State, value: string): void;
  [AuthMutationType.setLanguage](state: State, data: any): void;
  [AuthMutationType.updateAccessToken](
    state: State,
    token: string | null
  ): void;
  [AuthMutationType.setUserData](state: State, data: any): void;
  [AuthMutationType.setSideBar](state: State, value: boolean): void;
  [AuthMutationType.setFromUrl](state: State, url: any): void;
  [AuthMutationType.setRememberData](state: State, data: any): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [AuthMutationType.loginStart](state) {
    state.loggingIn = true;
  },
  [AuthMutationType.loginStop](state) {
    state.loggingIn = false;
  },
  [AuthMutationType.logout](state) {
    state.accessToken = null;
  },
  [AuthMutationType.setLanguage](state, data) {
    if (data.language == "EN") {
      state.language = LANGUAGE_EN;
      if (data.role === "user") {
        state.menuItem = US_MENU.MENU_EN;
      } else if (data.role === "admin") {
        state.menuItem = AM_MENU.MENU_EN;
      } else {
        state.menuItem = CH_MENU.MENU_EN;
      }
    } else {
      state.language = LANGUAGE_TH;
      if (data.role === "user") {
        state.menuItem = US_MENU.MENU_TH;
      } else if (data.role === "admin") {
        state.menuItem = AM_MENU.MENU_TH;
      } else {
        state.menuItem = CH_MENU.MENU_TH;
      }
    }
  },
  [AuthMutationType.updateAccessToken](state, accessToken) {
    state.accessToken = accessToken;
  },
  [AuthMutationType.setUserData](state, data: USER_TYPE) {
    state.userData = data;
  },

  [AuthMutationType.setSideBar](state) {
    state.sideBar = !state.sideBar;
  },

  [AuthMutationType.setFromUrl](state, value) {
    state.fromUrl = value;
  },

  [AuthMutationType.setRememberData](state, value) {
    state.rememberData = value;
  },
};
