<script setup lang="ts">
import { useReact, useVuex } from '@hooks/index'

const [count, setCount] = useReact(0)
const [list, setName] = useVuex()

const a = 100
</script>

<template>
  <div class="about_index">
    <h1>This is an about page {{ a }}</h1>
    <p>count: {{ count() }}</p>
    <p>name: {{ list.name }}</p>
  </div>
</template>

<style scoped lang="less">
.about_index{
  .red {
    color: red;
  }
}
</style>
