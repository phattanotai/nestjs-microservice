import { USER_LOGIN } from "../@types";
import axios from "axios";
import { URL_API } from "./../helper/api_gateway";

const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: "Bearer ",
  },
};

const addProduct = async (loginData: USER_LOGIN) => {
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

const editProduct = async (loginData: USER_LOGIN) => {
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

const getProduct = async () => {
  try {
    config.headers.authorization += localStorage.getItem("accessToken");
    const res = await axios.get(`${URL_API}/api/product`, config);
    if (res.data) {
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
export default {
  addProduct,
  getProduct,
  editProduct,
};
