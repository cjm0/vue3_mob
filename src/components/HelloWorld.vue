<script setup lang="ts">
import { getCurrentInstance, useAttrs } from 'vue'
const { proxy, appContext } = getCurrentInstance()

defineProps({
  msg: {
    type: String,
    default: '122',
    required: true,
  },
  modelValue: String
})
const emit = defineEmits(['on-text', 'update:modelValue'])

const attrs = useAttrs()
console.log('attrs', attrs)

defineExpose({
  a: 10,
  b: 20,
  proxy
})
</script>

<template>
  <div class="greetings">
    <h1 class="green" @click="emit('on-text', 'cjm')">{{ msg }}</h1>
    <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a>
      +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>
      . What's next?
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
