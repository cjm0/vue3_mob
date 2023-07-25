<script setup lang="ts">
defineProps({
  show: Boolean
})
const emit = defineEmits(['close'])

function handlerClose(type: string, ev: Event) {
  emit('close', type)
  console.log(type, (ev.target as HTMLButtonElement).value)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="comp_modal_mask">
        <div class="modal_container">
          <div class="modal_header">
            <slot name="header">default header</slot>
          </div>

          <div class="modal_body">
            <slot name="body">default body</slot>
          </div>

          <div class="modal_footer">
            <slot name="footer">
              default footer
              <button class="modal_button" @click="handlerClose('ok', $event)">OK</button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="less">
.comp_modal_mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}
.modal_container {
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal_header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal_body {
  margin: 20px 0;
}

.modal_button {
  float: right;
}

/*
 * 对于 transition="modal" 的元素来说
 * 当通过 Vue.js 切换它们的可见性时
 * 以下样式会被自动应用
 */
.modal-enter-from {
  opacity: 0;
}
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal_container,
.modal-leave-to .modal_container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>