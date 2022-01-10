<template>
  <div class="about">
    <slot name="data1"> h1 </slot>

    <slot name="data2"> h2 </slot>
  </div>
</template>

<style scoped>
.about {
  box-shadow: 0 4px 8px 0 black;
  transition: 0.3s;
  padding: 16;
  margin: 20px;
  width: 200px;
}
</style>
