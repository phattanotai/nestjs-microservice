import { USER_LOGIN, USER_TYPE } from "../@types";
import axios from "axios";
import { URL_API } from "./../helper/api_gateway";

const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
};

const addUser = async (loginData: USER_LOGIN) => {
  try {
    const res = await axios.post(`${URL_API}/api/users/`, loginData, config);
    if (res.data) {
      return {
        isRegister: true,
        isUsername: false,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      isRegister: false,
      isUsername: true,
    };
  }
};

const editUser = async (userData: USER_TYPE) => {
  try {
    const res = await axios.put(
      `${URL_API}/api/users/${userData.id}`,
      userData,
      config
    );
    if (res.data) {
      return {
        isRegister: true,
        isUsername: false,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      isRegister: false,
      isUsername: true,
    };
  }
};

const getUsers = async () => {
  try {
    // config.headers.authorization += localStorage.getItem("accessToken");
    const res = await axios.get(`${URL_API}/api/users/`, config);
    if (res.data) {
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getUserRole = async () => {
  try {
    config.headers.authorization += localStorage.getItem("accessToken");
    const res = await axios.get(`${URL_API}/api/users/userRole`, config);
    if (res.data) {
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  addUser,
  editUser,
  getUsers,
  getUserRole,
};
