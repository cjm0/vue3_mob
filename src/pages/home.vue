<script setup lang="ts">
import { useStoreCounter } from '@/stores/counter'

// import HelloWorld from '@/components/HelloWorld.vue'
// import Modal from '@/components/Modal/index.vue'
import { useReact, useVuex } from '@/hooks/index'

const router = useRouter()
const route = useRoute()
const storeCounter = useStoreCounter()

// 常量数据

// 响应式数据
const state = reactive({
  tables: [
    {
      name: 'cjm1',
      age: 101
    },
    {
      name: 'cjm2',
      age: 202
    },
  ],
  num: 10
})
const ipt = ref<HTMLInputElement | []>([])
const hw = ref<InstanceType<typeof HelloWorld> | null>(null)
const iptVal = ref('')
const showModal = ref(false)


// 公共函数


// 逻辑函数


// 生命周期
onMounted(() => {
  // console.log(ipt.value)
  // console.log(hw.value.proxy)
})
onBeforeUnmount(() => {

})
</script>

<template>
  <div class="home_index">
    <p>12345</p>
    <img src="@/assets/img/logo.svg" alt="">
    <HelloWorld></HelloWorld>
  </div>
</template>

<style scoped lang="less">
.home_index{
  p{
    color: var(--red);
    margin: 10px;
  }
  .span{
    letter-spacing: 0;
  }
}
</style>
