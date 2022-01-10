import { GetterTree } from "vuex";
import { State, REMEMBER_DATA_TYPE, FROM_URL } from "./state";
import { USER_TYPE } from "../../@types";
import { MENU_TYPE } from "../../assets/caption/menuCaption";
import CalculateService from "../../service/CalculateService";
import { RootState } from "@/store";

export type Getters = {
  getSideBar(state: State): boolean;
  getAuthCaption(state: State): any;
  getMenuItem(state: State): MENU_TYPE[];
  getToken(state: State): string | null | undefined;
  getLogin(state: State): boolean;
  getUserData(state: State): USER_TYPE;
  getFromUrl(state: State): FROM_URL;
  getRememberData(state: State): REMEMBER_DATA_TYPE;

  // getTaskById(state: State): (id: number) => TaskItem | undefined;
};

export const getters: GetterTree<State, RootState> & Getters = {
  getSideBar(state) {
    return state.sideBar;
  },
  getAuthCaption(state) {
    return state.language;
  },
  getMenuItem(state) {
    return state.menuItem;
  },
  getToken(state) {
    return state.accessToken;
  },
  getLogin(state) {
    return state.loggingIn;
  },
  getUserData(state) {
    return state.userData;
  },
  getFromUrl(state) {
    return state.fromUrl;
  },
  getRememberData(state) {
    const data = {
      remember: state.rememberData.remember,
      username: "",
      password: "",
    };

    if (state.rememberData.remember) {
      data.username = CalculateService.base64_decode(
        state.rememberData.username
      );
      data.password = CalculateService.base64_decode(
        state.rememberData.password
      );
    }
    return data;
  },

  // getTaskById: (state) => (id: number) => {
  //   return state.tasks.find((task) => task.id === id);
  // },
};
