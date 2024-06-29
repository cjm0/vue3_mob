import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStoreCounter = defineStore('counter', () => {
  const count = ref(2)

  const doubleCount = computed(() => count.value * 2)

  function increment(payload: number) {
    count.value = payload + count.value
  }

  return {
    count,
    doubleCount,
    increment,
  }
})
