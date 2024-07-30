/*
 * @Description : useMouse 鼠标处理
 * @Author      : chenjianmin
 * @Date        : 2023-04-03 18:34:56
 */

import type { Ref } from 'vue'
import useEvent from './event'

interface Mouse {
  x: Ref<number>,
  y: Ref<number>
}

export default function useMouse(): Mouse {
  const x = ref(0)
  const y = ref(0)

  useEvent(window, 'mousemove', (event: MouseEvent) => {
    x.value = event.pageX
    y.value = event.pageY
  })

  return { x, y }
}
