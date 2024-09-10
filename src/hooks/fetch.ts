/*
 * @Description : useFetch 接口请求处理 useFetch(url, params, 'post')
 * @Author      : chenjianmin
 * @Date        : 2023-04-03 19:23:45
 */

import $axios from '@/utils/axios'
import type { MaybeRef } from 'vue'

export default function useFetch(url: MaybeRef<string>, datas: object, method = 'get'): object {
  const data = shallowRef<object | null>(null)
  const error = shallowRef<Error | null>(null)

  watchEffect(async () => {
    // 在请求之前重设状态
    data.value = null
    error.value = null

    // 同步解析 url 值，以便将其作为 watchEffect 的依赖关系
    const urlValue = toValue(url)
    try {
      if (method === 'get') {
        data.value = await $axios.get(urlValue, { params: datas })
      } else {
        data.value = await $axios.post(urlValue, datas)
      }
    } catch (e:any) {
      error.value = e
    }
  })

  return { data, error }
}
