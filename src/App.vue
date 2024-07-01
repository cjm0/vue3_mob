<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'

// 移动端修复点击延迟
import FastClick from 'fastclick'
function fastClick() {
  if ('addEventListener' in document) {
    document.addEventListener(
      'DOMContentLoaded',
      function () {
        if (FastClick && FastClick.attach) {
          FastClick.prototype.focus = function (targetElement: any) {
            var deviceIsWindowsPhone = navigator.userAgent.indexOf('Windows Phone') >= 0
            var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone
            var length
            // 兼容处理:在iOS7中，有一些元素（如date、datetime、month等）在setSelectionRange会出现TypeError
            // 这是因为这些元素并没有selectionStart和selectionEnd的整型数字属性，所以一旦引用就会报错，因此排除这些属性才使用setSelectionRange方法
            if (
              deviceIsIOS &&
              targetElement.setSelectionRange &&
              targetElement.type.indexOf('date') !== 0 &&
              targetElement.type !== 'time' &&
              targetElement.type !== 'month' &&
              targetElement.type !== 'email'
            ) {
              length = targetElement.value.length
              targetElement.setSelectionRange(length, length)
              /* 修复bug ios 11.3不弹出键盘，这里加上聚焦代码，让其强制聚焦弹出键盘 */
              targetElement.focus()
            } else {
              targetElement.focus()
            }
          }
          FastClick.attach(document.body)
        }
      },
      false
    )
  }
}

// 注册 serviceWorker
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    /*
      * 为什么在 onload 后加载：https://web.dev/service-workers-registration
      * 换 serviceWorker 路径需要保持旧的 serviceWorker 文件防止用户读缓存失败
    */
    window.addEventListener('load', () => {
      // scope 参数用来指定控制的子目录，默认 '/'，根网域下的所有内容
      window.navigator.serviceWorker.register('/serviceWorker.js', { scope: '/' })
      .then((registration) => { // 注册成功
        console.log('serviceWorker register success with scope: ', registration.scope)
      })
      .catch((err) => { // 注册失败
        console.error('serviceWorker register fail: ', err);
      })
    })
  } else {
    console.error('serviceWorker 不支持')
  }
}

/*
  处理加载报错：
  * 当 Vite 加载动态导入失败时会触发 vite:preloadError 事件
  * 重新部署时，托管服务可能会删除之前部署的资源
  * 用户设备上运行的资源过时，并尝试导入相应的旧代码块，而这些代码块已经被删除
*/
function preloadError() {
  window.addEventListener('vite:preloadError', (event) => {
    console.error('vite:preloadError', event.payload)
    window.location.reload() // 刷新页面
  })
}

onMounted(() => {
  fastClick()
  // registerServiceWorker()
  preloadError()
})
</script>

<style scoped lang="less">

</style>