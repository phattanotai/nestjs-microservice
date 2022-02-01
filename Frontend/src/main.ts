import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import Dashboard from "./plugins/dashboard";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "mosha-vue-toastify/dist/style.css";
import "devextreme/dist/css/dx.light.css";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

createApp(App)
  .use(store)
  .use(router)
  .use(Dashboard)
  .use(Antd)
  .use(VueSweetalert2)
  .mount("#app");
