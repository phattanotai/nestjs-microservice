<template>
  <div>
    <base-nav
      class="navbar-top navbar-dark"
      id="navbar-main"
      :show-toggle-button="true"
      expand
    >
      <form
        class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto"
      >
        <div class="form-group mb-0">
          <base-input
            placeholder="Search"
            input-classes="input-group-alternative"
            alternative
            addon-right-icon="fas fa-search"
          ></base-input>
        </div>
      </form>
      <div>
        <ul class="navbar-nav select-language ml-auto">
          <li class="nav-item">
            <a
              v-bind:style="thActive"
              class="language nav-link"
              v-on:click="changeLanguage('TH')"
              target="_self"
              >TH</a
            >
          </li>
          <span class="navbar-text">|</span>
          <li class="nav-item">
            <a
              v-bind:style="enActive"
              class="language nav-link"
              v-on:click="changeLanguage('EN')"
              target="_self"
              >EN</a
            >
          </li>
        </ul>
      </div>
      <ul
        class="navbar-nav align-items-center d-none d-md-flex"
        style="margin-right: 6%"
      >
        <li class="nav-item dropdown">
          <base-dropdown class="nav-link pr-0">
            <template v-slot:title>
              <div class="media align-items-center">
                <span class="avatar avatar-sm rounded-circle">
                  <img
                    alt="Image placeholder"
                    src="/img/theme/team-1-800x800.jpg"
                  />
                </span>
                <div class="media-body ml-2 d-none d-lg-block">
                  <span class="mb-0 text-sm font-weight-bold">{{
                    userData.name
                  }}</span>
                </div>
              </div>
            </template>

            <template v-slot:menu>
              <router-link to="/profile" class="dropdown-item">
                <i class="ni ni-single-02 text-green"></i>
                <span>{{ store.getters.getAuthCaption.menu_profile }}</span>
              </router-link>
              <div class="dropdown-divider"></div>

              <a
                style="cursor: pointer"
                v-on:click="logout()"
                class="dropdown-item"
              >
                <i class="ni ni-user-run text-red"></i>
                <span>{{ store.getters.getAuthCaption.menu_logout }}</span>
              </a>
            </template>
          </base-dropdown>
        </li>
      </ul>
    </base-nav>
  </div>
</template>
<script lang="ts">
import { AuthActionTypes } from "../../../src/store/auth/action-types";
import { h, ref, reactive, onMounted, computed, getCurrentInstance } from "vue";
import { useStore } from "../../store";

export default {
  setup() {
    const app = getCurrentInstance();

    const store = useStore();
    const $sidebar = app?.appContext.app.config.globalProperties.$sidebar;
    const year = new Date().getFullYear();
    const showMenu = ref(false);
    // const userData = reactive({
    //   data: store.getters.getUserData,
    // });

    const userData = computed(() => store.getters.getUserData);
    const enActive = reactive({
      style: {
        color: "",
        fontSize: "",
      },
    });
    const thActive = reactive({
      style: {
        color: "",
        fontSize: "",
      },
    });
    const activeStyle = {
      color: "tomato",
      fontSize: "16px",
    };
    const inactiveStyle = {
      color: "",
      fontSize: "",
    };

    onMounted(() => {
      store.dispatch(AuthActionTypes.setUserData);
      // userData.data = store.getters.getUserData;
      if (localStorage.getItem("language") == "EN") {
        enActive.style = activeStyle;
        thActive.style = inactiveStyle;
      } else {
        thActive.style = activeStyle;
        enActive.style = inactiveStyle;
      }
      console.log("mounted!");
    });

    const toggleSidebar = () => {
      $sidebar.displaySidebar(!$sidebar.showSidebar);
    };

    const hideSidebar = () => {
      $sidebar.displaySidebar(false);
    };
    const toggleMenu = () => {
      showMenu.value = !showMenu.value;
    };

    const logout = () => {
      store.dispatch(AuthActionTypes.doLogout);
    };
    const changeLanguage = (lang: string) => {
      if (lang == "EN") {
        enActive.style = activeStyle;
        thActive.style = inactiveStyle;
      } else {
        thActive.style = activeStyle;
        enActive.style = inactiveStyle;
      }
      localStorage.setItem("language", lang);
      store.dispatch(AuthActionTypes.updateLanguage, lang);
    };

    return {
      year,
      showMenu,
      enActive,
      thActive,
      userData,
      store,
      // toggleSidebar,
      // hideSidebar,
      // toggleMenu,
      logout,
      changeLanguage,
    };
  },
};
</script>
<style>
.language {
  color: white;
}
.active {
  color: tomato;
}
</style>
