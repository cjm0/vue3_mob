<template>
  <div class="home_index">
    <p v-for="(item, index) in state.tables" :key="index" ref="ipt">{{ item.age }}</p>
  </div>
  <HelloWorld class="a" name="cjm" @click="onText" msg="false" @on-text="onText" ref="hw" v-model="iptVal"></HelloWorld>
  <p>iptVal {{ iptVal }}</p>
</template>

<script setup lang="ts">
import { ref, reactive, inject, getCurrentInstance, watch, watchEffect, onMounted, onBeforeUnmount} from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'

const { proxy } = getCurrentInstance()
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
const ipt = ref([])
const hw = ref(null)
const iptVal = ref('')


const onText = (msg) => {
  console.log(msg)
}

onMounted(() => {
  console.log(ipt.value)
  console.log(hw.value?.proxy.$options)
})

onBeforeUnmount(() => {

})
</script>

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
