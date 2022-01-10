import Sidebar from "./SideBar.vue";
import SidebarItem from "./SidebarItem.vue";

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [],
  isMinimized: false,
  displaySidebar(value: boolean) {
    this.showSidebar = value;
  },
  toggleMinimize() {
    document.body.classList.toggle("sidebar-mini");
    // we simulate the window Resize so the charts will get updated in realtime.
    const simulateWindowResize = setInterval(() => {
      window.dispatchEvent(new Event("resize"));
    }, 180);

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(() => {
      clearInterval(simulateWindowResize);
    }, 1000);

    this.isMinimized = !this.isMinimized;
  },
};

const SidebarPlugin = {
  install(app: any, options: any) {
    if (options && options.sidebarLinks) {
      SidebarStore.sidebarLinks = options.sidebarLinks;
    }
    // let app = new Vue({
    //   data: {
    //     sidebarStore: SidebarStore,
    //   },
    // });
    // app.prototype.$sidebar = SidebarStore;
    app.config.globalProperties.$sidebar = SidebarStore;
    app.provide("$sidebar", SidebarStore);
    app.component("side-bar", Sidebar);
    app.component("sidebar-item", SidebarItem);
  },
};

export default SidebarPlugin;
