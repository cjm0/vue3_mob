<script setup lang="ts" >
import TheWelcome from '@/components/TheWelcome.vue'
// import Modal from '@/components/Modal/index.vue'
import type { Ref } from 'vue'

const router = useRouter()

// 数据


// 函数
function toAbout() {
  router.push('/about?name=123')
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
    <p class="p"></p>

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
