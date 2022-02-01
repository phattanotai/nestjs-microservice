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
