<template>
  <nav
    class="navbar"
    :class="[
      { 'navbar-expand-md': expand },
      { 'navbar-transparent': transparent },
      { [`bg-${type}`]: type },
    ]"
  >
    <div :class="containerClasses">
      <slot name="brand">
        <base-button
          class="d-lg-block d-none"
          size="sm"
          type="info"
          v-on:click="toggleSidebar"
          v-if="showButtonToggle"
        >
          <i class="fas fa-align-justify"></i>
        </base-button>
        <router-link
          :to="store.getters.getFromUrl.path"
          class="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
          >{{ store.getters.getFromUrl.name }}</router-link
        >
        <router-link
          :to="$route.path"
          class="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
        >
          <span class="navbar-text">/</span>
        </router-link>

        <router-link
          :to="$route.path"
          :active="isActive"
          class="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
          >{{ $route.name }}</router-link
        >
      </slot>

      <div
        class="collapse navbar-collapse"
        :class="{ show: toggled }"
        :id="contentId"
        v-click-outside="closeMenu"
      >
        <slot name="closeMenu"></slot>
        <slot></slot>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
// import NavbarToggleButton from "./NavbarToggleButton";
import { AuthActionTypes } from "../../src/store/auth/action-types";
import { getCurrentInstance, onMounted, onUpdated, ref } from "vue";
import { useStore } from "../store";

export default {
  name: "base-nav",
  components: {
    // NavbarToggleButton
  },
  props: {
    type: {
      type: String,
      default: "",
      description: "Navbar type (e.g default, primary etc)",
    },
    title: {
      type: String,
      default: "",
      description: "Title of navbar",
    },
    contentId: {
      type: [String, Number],
      default: Math.random().toString(),
      description:
        "Explicit id for the menu. By default it's a generated random number",
    },
    containerClasses: {
      type: [String, Object, Array],
      default: "container-fluid",
    },
    transparent: {
      type: Boolean,
      default: false,
      description: "Whether navbar is transparent",
    },
    expand: {
      type: Boolean,
      default: false,
      description: "Whether navbar should contain `navbar-expand-lg` class",
    },
    showToggleButton: {
      type: Boolean,
      default: false,
    },
  },

  setup(props: any) {
    const toggled = ref(false);
    let showButtonToggle = props.showToggleButton;
    const isActive = ref(true);
    const store = useStore();
    const app = getCurrentInstance();
    const $route = app?.appContext.app.config.globalProperties.$route;

    const closeMenu = () => {
      toggled.value = false;
    };

    const toggleSidebar = () => {
      store.dispatch(AuthActionTypes.toggleSidebar, undefined);
    };

    onMounted(() => {
      // setTimeout(() => {
      //   store.dispatch(AuthActionTypes.toggleSidebar, undefined);
      // }, 10000);
    });

    onUpdated(() => {
      if (document.body.clientWidth < 800) {
        showButtonToggle = false;
      } else {
        showButtonToggle = true;
      }
    });

    return {
      toggled,
      showButtonToggle,
      isActive,
      toggleSidebar,
      closeMenu,
      store,
      $route,
    };
  },
};
</script>
<style></style>
