/*
 * @Description : useEvent 事件处理
 * @Author      : chenjianmin
 * @Date        : 2023-04-03 18:34:56
 */

import { onMounted, onUnmounted } from 'vue'

export default function useEvent(target, event: string, callback: Function): void {
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}