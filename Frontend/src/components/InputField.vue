<template>
  <div>
    <input @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const input = ref("");
    return { input };
  },
};
</script>
