<template>
  <div id="app">
    <!-- <pre-loader v-if="loading" />
    <router-view v-if="!loading" /> -->

    <router-view />

    <!-- <about></about>
    <about>
      <template v-slot:data1>
        <div>11</div>
      </template>
      <template v-slot:data2>
        <div>22</div>
      </template>
    </about>
    <about>
      <div>dd</div>
    </about> -->
    <!-- <button v-on:click="click">ddd</button> -->
  </div>
</template>

<script lang="ts">
import { AuthActionTypes } from "../src/store/auth/action-types";
import { useStore } from "../src/store";
import { onMounted, ref } from "vue";
import About from "./views/About.vue";
import PreLoader from "./components/PreLoader.vue";

export default {
  components: { About, PreLoader },
  setup() {
    const store = useStore();
    const loading = ref<Boolean>(true);

    onMounted(() => {
      setTimeout(() => {
        const lang = localStorage.getItem("language") || "";
        store.dispatch(AuthActionTypes.updateLanguage, lang);
        loading.value = false;
      }, 4000);
    });

    return { loading };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: "Pridi", serif;
  font-family: "Kanit", sans-serif;
  font-size: 18px;
  /* background-color: bisque; */
}
</style>
