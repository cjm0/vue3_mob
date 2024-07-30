/*
 * @Description : useFetch 接口请求处理 useFetch(url, params, 'post')
 * @Author      : chenjianmin
 * @Date        : 2023-04-03 19:23:45
 */

export default function useFetch(url: string, datas: object, method = 'get'): object {
  const $axios: any = inject('$axios')
  const data = ref(null)
  const error = ref(null)

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
