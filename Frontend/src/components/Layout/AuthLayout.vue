<template>
  <div class="main-content bg-default">
    <!-- Navbar -->
    <base-nav
      class="navbar-top navbar-horizontal navbar-dark"
      containerClasses="px-4 container"
      expand
    >
      <template v-slot:brand>
        <router-link class="navbar-brand" to="/">
          <img src="/img/brand/logo-ex-light.png" />
        </router-link>
      </template>

      <template v-slot:closeMenu>
        <!-- Collapse header -->
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <router-link to="/">
                <img src="/img/brand/green.png" />
              </router-link>
            </div>
            <div class="col-6 collapse-close">
              <button
                type="button"
                class="navbar-toggler"
                aria-label="Toggle sidenav"
              >
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
        <!-- Navbar items -->
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/auth/login">
              <i class="ni ni-key-25"></i>
              <span class="nav-link-inner--text">{{
                $store.getters.getAuthCaption.link_login
              }}</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/auth/register">
              <i class="ni ni-circle-08"></i>
              <span class="nav-link-inner--text">{{
                $store.getters.getAuthCaption.link_register
              }}</span>
            </router-link>
          </li>
        </ul>
        <div>
          <ul class="navbar-nav select-language ml-auto">
            <li class="nav-item">
              <a
                v-bind:style="thActive.style"
                class="language nav-link"
                target="_self"
                v-on:click="changeLanguage('TH')"
                >TH</a
              >
            </li>

            <li class="nav-item">
              <a
                v-bind:style="enActive.style"
                class="language nav-link"
                target="_self"
                v-on:click="changeLanguage('EN')"
                >EN</a
              >
            </li>
          </ul>
        </div>
      </template>
    </base-nav>

    <!-- Header -->
    <div class="header bg-gradient-info py-6 py-lg-7">
      <div class="container"></div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon class="fill-default" points="2560 0 2560 100 0 100" />
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <div class="container mt--4 pb-4">
      <slide-y-up-transition mode="out-in" origin="center top">
        <router-view></router-view>
      </slide-y-up-transition>
    </div>
    <footer class="py-5">
      <div class="container">
        <div class="row align-items-center justify-content-xl-between">
          <div class="col-xl-6">
            <div class="copyright text-center text-xl-left text-muted">
              &copy; {{ year }}
              <a
                href="https://portfolios.gracia.tech"
                class="font-weight-bold ml-1"
                target="_blank"
                >Phattanothai Pukham</a
              >
            </div>
          </div>
          <div class="col-xl-6">
            <ul
              class="nav nav-footer justify-content-center justify-content-xl-end"
            >
              <li class="nav-item">
                <a
                  href="https://portfolios.gracia.tech/about"
                  class="nav-link"
                  target="_blank"
                  >{{ $store.getters.getAuthCaption.link_about }}</a
                >
              </li>
              <li class="nav-item">
                <a
                  href="https://portfolios.gracia.tech/contact"
                  class="nav-link"
                  target="_blank"
                  >{{ $store.getters.getAuthCaption.link_contact }}</a
                >
              </li>
              <li class="nav-item">
                <a
                  href="https://github.com/phattanotai"
                  class="nav-link"
                  target="_blank"
                  >{{ $store.getters.getAuthCaption.link_faq }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script lang="ts">
import { h, ref, reactive, onMounted } from "vue";
import { useStore } from "../../store";
import { AuthActionTypes } from "../../store/auth/action-types";
import router from "../../router";

export default {
  setup() {
    const store = useStore();
    const year = new Date().getFullYear();
    const showMenu = false;
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

    onMounted(() => {
      if (store.getters.getToken) {
        router.push("/home");
      }

      if (localStorage.getItem("language") == "EN") {
        enActive.style = activeStyle;
        thActive.style = inactiveStyle;
      } else {
        thActive.style = activeStyle;
        enActive.style = inactiveStyle;
      }
    });

    // expose to template
    return {
      year,
      showMenu,
      enActive,
      thActive,
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
