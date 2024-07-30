/*
 * @Description : useVuex
 * @Author      : chenjianmin
 * @Date        : 2023-05-26 16:45:59
 */

const list = reactive({
  name: 'cjm100'
})

export default function useVuex() {
  // const get = () => list.name
  const set = (v) => {
    list.name = v
  }
  return [list, set]
}
