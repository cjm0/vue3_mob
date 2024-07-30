/*
 * @Description : useReact
 * @Author      : chenjianmin
 * @Date        : 2023-05-26 16:45:59
 */

interface Options {
  equals?: boolean,
}

export default function useReact(value: any, options: Options | undefined) {
  const r = shallowRef(value)
  const get = () => r.value
  const set = (v: Function | any) => {
    r.value = typeof v === 'function' ? v(r.value) : v
    if (options?.equals === false) {
      triggerRef(r)
    }
  }
  return [get, set]
}
