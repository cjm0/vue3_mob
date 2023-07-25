import type { PiniaPluginContext } from 'pinia'
// import debounce from 'lodash/debounce'

export default function piniaPlugin({ store }: PiniaPluginContext) {
  // context.pinia // 用 `createPinia()` 创建的 pinia。
  // context.app // 用 `createApp()` 创建的当前应用(仅 Vue 3)。
  // context.store // 该插件想扩展的 store
  // context.options // 定义传给 `defineStore()` 的 store 的可选对象。

  // 添加全局对象
  store.global = {}
  if (import.meta.env.VITE_APP_BUILD_ENV === 'dev') {
    // 任何由插件返回的属性都会被 devtools 自动追踪，赋值追踪需要手动加
    store._customProperties.add('global')
  }

  // 响应 store 变化
  store.$subscribe((mutation, state) => {
    console.log(`${mutation.storeId} state: ${JSON.stringify(state)}`)
  })

  // 响应 store actions
  store.$onAction(
    ({
      name, // action 名称
      store, // store 实例
      args, // 传递给 action 的参数数组
      after, // 在 action 返回或解决后的钩子
      onError, // action 抛出或拒绝的钩子
    }) => {
      const startTime = Date.now()
      console.log(`${store.$id} ${name}: Start ${args.join(', ')}`)

      // 在 action 成功并完全运行后触发
      after((result) => {
        console.log(`${store.$id} ${name}: Finished after ${Date.now() - startTime}ms Result: ${result}`)
      })

      // 如果 action 抛出或返回一个拒绝的 promise
      onError((error) => {
        console.warn(`${store.$id} ${name}: Failed after ${Date.now() - startTime}ms Error: ${error}`)
      })
    }
  )
}