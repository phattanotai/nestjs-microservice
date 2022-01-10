import { message, notification } from "ant-design-vue";
import { createToast } from "mosha-vue-toastify";
import Swal from "sweetalert2";

message.config({
  top: "10px",
  duration: 2,
  maxCount: 3,
});

notification.config({
  placement: "topRight",

  duration: 3,
});

export default {
  Info(msg: string) {
    createToast(msg, {
      position: "top-right",
      type: "info",
    });
  },
  Error(msg: string) {
    createToast(msg, {
      position: "top-right",
      type: "danger",
    });
  },
  Success(msg: string) {
    createToast(msg, {
      position: "top-right",
      type: "success",
    });
  },
  Warning(msg: string) {
    createToast(msg, {
      position: "top-right",
      type: "warning",
    });
  },
  Loading(msg: string) {
    message.open({
      content: () => msg,
      duration: 2,
      type: "loading",
      style: {
        top: "10px",
        position: "absolute",
        right: "10px",
      },
    });
  },
};
