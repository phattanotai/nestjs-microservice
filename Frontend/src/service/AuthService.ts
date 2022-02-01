import { USER_LOGIN } from "../@types";
import axios from "axios";
import { URL_API } from "./../helper/api_gateway";

const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
};

const login = async (loginData: USER_LOGIN) => {
  try {
    const res = await axios.post(
      `${URL_API}/api/users/login`,
      loginData,
      config
    );
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
    return "";
  }
};

const getUserProfile = async () => {
  try {
    // config.headers.authorization += localStorage.getItem("accessToken");
    const res = await axios.get(`${URL_API}/api/userProfile`, config);
    if (res.data) {
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
export default {
  login,
  getUserProfile,
};
