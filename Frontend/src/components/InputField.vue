<template>
  <div>
    <!-- <input
      @input="$emit('update:modelValue', $event.target.value)"
      v-model="model"
    /> -->
    <input :value="email" @input="$emit('update:email', $event.target.value)" />
    <input
      :value="password"
      @input="$emit('update:password', $event.target.value)"
      type="password"
    />
    <button @click="click">click</button>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";

export default {
  emits: ["onClickme", "updateValue"],
  props: ["value", "password", "email"],
  setup(props, { emit }) {
    const click = () => {
      emit("onClickme", "test");
    };

    onMounted(() => {
      console.log(props);
    });
    return { click };
  },
};
</script>

<input-field
  @onClickme="onClickme"
  :password="formData.user.password"
  :email="formData.user.email"
  v-model:password="formData.user.password"
  v-model:email="formData.user.email"
/>
