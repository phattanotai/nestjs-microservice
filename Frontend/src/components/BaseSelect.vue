<template>
  <div
    class="form-group"
    :class="{ disabled: disabled, 'form-check-inline': inline }"
  >
    <select class="form-control" v-model="model" :disabled="disabled">
      <option v-for="value in options" :key="value">{{ value }}</option>
      <th></th>
    </select>
  </div>
</template>
<script>
import { randomString } from "./stringUtils";

export default {
  name: "base-select",
  props: {
    value: {},
    options: {},
    disabled: {
      type: Boolean,
      description: "Whether select is disabled",
    },
    inline: {
      type: Boolean,
      description: "Whether select is inline",
    },
  },
  data() {
    return {
      cbId: "",
      touched: false,
    };
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(check) {
        if (!this.touched) {
          this.touched = true;
        }
        this.$emit("update:modelValue", check);
      },
    },
  },
  mounted() {
    this.cbId = randomString();
  },
};
</script>
