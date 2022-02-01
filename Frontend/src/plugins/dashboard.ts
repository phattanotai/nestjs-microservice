import "@/assets/vendor/nucleo/css/nucleo.css";
import "@/assets/scss/argon.scss";
import globalComponents from "./globalComponents";
import globalDirectives from "./globalDirectives";
import SidebarPlugin from "@/components/SidebarPlugin/index";
// import NotificationPlugin from "@/components/NotificationPlugin/index"

export default {
  install(app: any) {
    app.use(globalComponents);
    app.use(globalDirectives);
    app.use(SidebarPlugin);
    // Vue.use(NotificationPlugin);
  },
};
