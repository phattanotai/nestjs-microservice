import { USER_TYPE } from "../../@types";
import { LANGUAGE_TH } from "../../assets/caption/authCaption";
import { MENU_TYPE } from "../../assets/caption/menuCaption";

export type FROM_URL = {
  name: string;
  path: string;
};

export type REMEMBER_DATA_TYPE = {
  remember: boolean;
  username: string;
  password: string;
};

export type State = {
  accessToken: string | null | undefined;
  loggingIn: boolean;
  userData: USER_TYPE;
  rememberData: REMEMBER_DATA_TYPE;
  sideBar: boolean;
  language: any;
  menuItem: MENU_TYPE[];
  fromUrl: FROM_URL;
};

export const state: State = {
  accessToken: "",
  loggingIn: false,
  userData: {
    id: 0,
    name: "",
    email: "",
    role: "",
    imagePath: "",
  },
  rememberData: {
    remember: false,
    username: "",
    password: "",
  },
  sideBar: true,
  language: LANGUAGE_TH,
  menuItem: [],
  fromUrl: {
    name: "",
    path: "",
  },
};
