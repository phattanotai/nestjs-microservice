<template>
  <div class="flaxBox">
    <lottie
      :options="loadingOptions"
      :height="200"
      :width="200"
      v-if="loading"
    />
    <lottie
      :options="successOptions"
      :height="200"
      :width="200"
      v-if="success"
    />
  </div>
</template>
<script lang="ts">
import lottie from "vue-lottie/src/lottie.vue";
const locationJson = require("../assets/json/world-locations.json");
const successJson = require("../assets/json/loading.json");

import { ref, onMounted } from "vue";
export default {
  components: {
    lottie: lottie,
  },
  setup() {
    const loadingOptions = { animationData: locationJson };
    const successOptions = { animationData: successJson };
    const width = window.innerWidth;
    const heght = window.innerHeight;
    const loading = ref<boolean>(true);
    const success = ref<boolean>(false);

    onMounted(() => {
      setTimeout(() => {
        loading.value = false;
        success.value = true;
      }, 3000);
    });

    return {
      loadingOptions,
      successOptions,
      heght,
      width,
      loading,
      success,
    };
  },
};
</script>

<style scoped>
.flaxBox {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}
</style>
