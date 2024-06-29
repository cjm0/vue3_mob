<script setup lang="ts">
import { ref, reactive, inject, getCurrentInstance, watch, watchEffect, onMounted, onBeforeUnmount, effectScope, getCurrentScope, onScopeDispose, onRenderTracked, onRenderTriggered, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStoreCounter } from '@stores/counter'

import HelloWorld from '@components/HelloWorld.vue'
import Modal from '@components/Modal/index.vue'
import { useReact, useVuex } from '@hooks/index'

const router = useRouter()
const route = useRoute()
const storeCounter = useStoreCounter()

// 响应式数据-数据
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


// 逻辑函数-响应式数据-方法
const toggleModal = () => {
  showModal.value = !showModal.value
}

// 逻辑函数-响应式数据-方法
const toggleModal2 = () => {
  showModal.value = !showModal.value
}

// 逻辑函数-响应式数据-方法
const toggleModal3 = () => {
  showModal.value = !showModal.value
}

// 逻辑函数-响应式数据-方法
const add = () => {
  state.num++
}

// 逻辑函数-响应式数据-方法
const setIpt = () => {
  ipt.value.value = 'cjm'
}

// 逻辑函数-响应式数据-方法
const setIptVal = () => {
  iptVal.value = 'cjm'
}

// 逻辑函数-响应式数据-方法
const setIptVal2 = () => {

}

// 逻辑函数-计算属性
const computedVal = computed(() => {
  return state.num + 10
})

// 逻辑函数-监听
watch(() => state.num, (newVal, oldVal) => {
  console.log(newVal, oldVal)
})

// 逻辑函数-监听
watchEffect(() => {
  console.log(state.num)
})

// 逻辑函数-作用域
const scope = effectScope()
// 逻辑函数-函数
storeCounter.increment(10)
function setReset() {
  storeCounter.$reset()
}
// console.log('store', storeCounter)

const onText = (msg) => {
  console.log(msg)
}

function toError() {
  console.log(route)
  router.push('ddd')
}

const [list, setName] = useVuex()

const [count, setCount] = useReact(0)
// console.log(999, count());
setCount(count => {
  return count + 10
}) // 更新值
// console.log(222, count());

// onRenderTracked((event) => {
//   debugger
// })

// onRenderTriggered((event) => {
//   debugger
// })

const toAbout = () => {
  setName('cjm2')
  router.push('about')
}


// 生命周期
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

    <p>count:{{ count() }}</p>
    <p>name: {{ list.name }}</p>

    <p @click="toAbout">to about</p>

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

    <p @click="setReset">storeCounter.count {{ storeCounter.count }} {{ storeCounter.doubleCount }}</p>
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
