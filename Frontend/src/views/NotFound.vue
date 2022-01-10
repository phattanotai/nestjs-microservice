<template>
  <div>
    <lottie :options="defaultOptions" :height="heght" :width="width" />
  </div>
</template>
<script lang="ts">
import lottie from "vue-lottie/src/lottie.vue";
const notfound = require("../assets/json/notFound.json");

import { onMounted } from "vue";
export default {
  components: {
    lottie: lottie,
  },
  setup() {
    const defaultOptions = { animationData: notfound };
    const width = window.innerWidth;
    const heght = window.innerHeight;

    onMounted(() => {
      console.log(22);
    });

    return {
      defaultOptions,
      heght,
      width,
    };
  },
};
</script>
