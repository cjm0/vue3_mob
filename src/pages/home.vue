<script setup lang="ts" >
import TheWelcome from '@/components/TheWelcome.vue'
// import Modal from '@/components/Modal/index.vue'

import { useI18n } from 'vue-i18n'
import type { Ref } from 'vue'

defineOptions({
  name: 'HomeIndex',
})

const { t, locale } = useI18n()
const router = useRouter()

// 数据
let ref1 = markRaw({
  namespace: '123',
  name: '123',
})
console.log(333, isProxy(ref1), reactive(ref1))



// 函数
function toAbout() {
  router.push('/about?name=123')
}
function changeRef1() {
  locale.value = 'en-US'
}


// 生命周期
onMounted(() => {
  console.log('onMounted')
})
onBeforeUnmount(() => {
  console.log('onBeforeUnmount')
})
</script>

<template>
  <div class="home_index">
    <p class="p"><img src="@/assets/img/logo.svg" alt="" class="logo"></p>
    <p class="p">home</p>
    <p class="p" @click="toAbout">to about</p>

    <p @click="changeRef1">
      {{ t('age', { age: 20 }) }}
    </p>

    <TheWelcome></TheWelcome>
  </div>
</template>

<style scoped lang="less">
.home_index{
  .p{
    margin: 10px;
  }
  .logo{
    width: 100px;
  }
  .p1{
    color: var(--red);
  }
}
</style>
