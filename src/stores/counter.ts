// stores/counter.ts
export const useStoreCounter = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment(payload: number = 1) {
    count.value = count.value + payload
  }

  return { count, doubleCount, increment, }
})
