<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="World Express"
      title="World Express"
      logo="/img/brand/logo-express.png"
      v-if="sideBar"
    >
      <template v-slot:links>
        <sidebar-item
          v-for="(item, index) in menuItem"
          v-bind:key="index"
          v-bind:item="item"
          :link="{
            name: item.name,
            icon: item.icon,
            path: item.path,
          }"
        />
      </template>
    </side-bar>

    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>
      <div>
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, reactive, onMounted, computed } from "vue";
import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import { useStore } from "../../store";
import { AuthActionTypes } from "../../store/auth/action-types";
import router from "../../router";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
  },

  setup() {
    const sidebarBackground = "vue";
    const store = useStore();
    const menuItem = computed(() => store.getters.getMenuItem);
    const sideBar = computed(() => store.getters.getSideBar);
    const getUserData = computed(() => store.getters.getUserData);

    onMounted(() => {
      if (!store.getters.getLogin) {
        router.push("/auth/login");
      }
    });

    return {
      sidebarBackground,
      sideBar,
      menuItem,
      getUserData,
    };
  },
};
</script>
<style lang="scss"></style>
