<script setup lang="ts">
const a = 100
</script>

<template>
  <div class="about_index">
    <h1>This is an about page {{ a }}</h1>
  </div>
</template>

<style scoped lang="less">
.about_index{
  .red {
    color: red;
  }
}
</style>
