<script setup lang="ts">
import { ref, reactive, inject, getCurrentInstance, watch, watchEffect, onMounted, onBeforeUnmount, effectScope, getCurrentScope, onScopeDispose, onRenderTracked, onRenderTriggered } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCounterStore } from '@stores/counter'

import HelloWorld from '@components/HelloWorld.vue'
import Modal from '@components/Modal/index.vue'
import { useReact } from '@hooks/index'

const router = useRouter()
const route = useRoute()
const counterStore = useCounterStore()

const state = reactive({
  tables: [
    {
      name: 'cjm1',
      age: 10
    },
    {
      name: 'cjm2',
      age: 20
    },
  ],
  num: 10
})
const ipt = ref<HTMLInputElement | []>([])
const hw = ref<InstanceTyp<typeof HelloWorld> | null>(null)
const iptVal = ref('')
const showModal = ref(false)

counterStore.increment(10)
function setReset() {
  counterStore.$reset()
}
// console.log('store', counterStore)

const onText = (msg) => {
  console.log(msg)
}

function toError() {
  console.log(route)
  router.push('ddd')
}

// const [count, setCount] = useReact(0)
// console.log(111, count());
// setCount(count => {
//   return count + 10
// }) // 更新值
// console.log(222, count());

// onRenderTracked((event) => {
//   debugger
// })

// onRenderTriggered((event) => {
//   debugger
// })






onMounted(() => {
  // console.log(ipt.value)
  console.log(import.meta.env)
  console.log(hw.value.proxy)
})
onBeforeUnmount(() => {

})
</script>

<template>
  <div class="home_index">
    <p v-for="(item, index) in state.tables" :key="index" ref="ipt">{{ item.age }}</p>

    <HelloWorld class="a" name="cjm" @click="onText" msg="false" @on-text="onText" ref="hw" v-model="iptVal"></HelloWorld>
    <p>iptVal {{ iptVal }}</p>

    <!-- 使用这个 modal 组件，传入 prop -->
    <p @click="showModal = true">showModal</p>
    <Modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3>this is my header</h3>
      </template>
    </Modal>

    <p @click="toError">failure router</p>

    <p @click="setReset">counterStore.count {{ counterStore.count }} {{ counterStore.doubleCount }}</p>
  </div>
</template>

<style scoped lang="less">
.home_index{
  p{
    color: @red;
    margin: 10px;
  }
  .span{
    letter-spacing: 0;
  }
}
</style>
