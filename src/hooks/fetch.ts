/*
 * @Description : useFetch 接口请求处理 useFetch(url, params, 'post')
 * @Author      : chenjianmin
 * @Date        : 2023-04-03 19:23:45
 */

import { ref, isRef, unref, watchEffect, inject } from 'vue'

export default function useFetch(URL: string, datas: object, method = 'get'): object {
  const $axios: any = inject('$axios')
  const url = unref(URL) // unref() 解包可能为 ref 的值
  const data = ref(null)
  const error = ref(null)

  function doFetch() {
    // 在请求之前重设状态
    data.value = null
    error.value = null

    if (method === 'get') {
      $axios.get(url, { params: datas })
      .then(res => {
        data.value = res
      })
      .catch(err => {
        error.value = err
      })
    } else {
      $axios.post(url, datas)
      .then(res => {
        data.value = res
      })
      .catch(err => {
        error.value = err
      })
    }
  }

  if (isRef(url)) {
    watchEffect(doFetch) // 若输入的 URL 是一个 ref，那么启动一个响应式的请求
  } else {
    doFetch() // 只请求一次，避免监听器的额外开销
  }

  return { data, error }
}
