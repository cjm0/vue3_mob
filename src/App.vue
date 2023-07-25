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

// 微信服务号，用户调整字体大小导致页面错位
function fontSize() {
  if (
    typeof window.WeixinJSBridge == 'object' &&
    typeof window.WeixinJSBridge.invoke == 'function'
  ) {
    handleFontSize()
  } else {
    document.addEventListener('WeixinJSBridgeReady', handleFontSize, false)
  }
}
function handleFontSize() {
  // 设置网页字体为默认大小
  window.WeixinJSBridge.invoke('setFontSizeCallback', { fontSize: 0 })
  // 重写设置网页字体大小的事件
  window.WeixinJSBridge.on('menu:setfont', function () {
    window.WeixinJSBridge.invoke('setFontSizeCallback', { fontSize: 0 })
  })
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

onMounted(() => {
  fastClick()
  fontSize()
  registerServiceWorker()
})
</script>

<style scoped lang="less">

</style>