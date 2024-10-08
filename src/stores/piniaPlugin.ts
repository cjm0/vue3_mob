import type { PiniaPluginContext } from 'pinia'

export default function piniaPlugin({ store }: PiniaPluginContext) {
  // context.pinia 用 `createPinia()` 创建的 pinia
  // context.app 用 `createApp()` 创建的当前应用(仅 Vue 3)
  // context.store 该插件想扩展的 store
  // context.options 定义传给 `defineStore()` 的 store 的可选对象

  // 添加全局对象
  store.global = {}
  if (import.meta.env.VITE_BUILD_ENV === 'dev') {
    // 任何由插件返回的属性都会被 devtools 自动追踪，赋值追踪需要手动加
    store._customProperties.add('global')
  }

  // 监听 store 变化
  store.$subscribe((mutation, state) => {
    console.log(`store ${mutation.storeId}: ${JSON.stringify(state)}`)
    // 每当状态发生变化时，将整个 state 持久化到本地存储
    // localStorage.setItem(mutation.storeId, JSON.stringify(state))
  })

  // 监听 action 变化
  store.$onAction(
    ({
      store, // store 实例
      name, // action 名称
      args, // 传递给 action 的参数数组
      after, // 在 action 返回或解决后的钩子
      onError, // action 抛出或拒绝的钩子
    }) => {
      const storeName = `store ${store.$id} ${name}`
      const startTime = Date.now()
      console.log(`${storeName}: Start ${args.join(', ')}`)

      // 在 action 成功并完全运行后触发
      after((result) => {
        console.log(`${storeName}: Finished after ${Date.now() - startTime}ms Result: ${result}`)
      })

      // 如果 action 抛出或返回一个拒绝的 promise
      onError((error) => {
        console.warn(`${storeName}: Failed after ${Date.now() - startTime}ms Error: ${error}`)
      })
    }
  )
}