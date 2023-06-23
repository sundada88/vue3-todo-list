import { vi } from 'vitest'
import type { Task } from '../tasks'
import { TaskStatus } from '../tasks'
export { TaskStatus } from '../tasks'

const tasks: Task[] = [
  {
    id: '1',
    title: '吃饭',
    status: TaskStatus.ACTIVE,
    content: '干啥啥不行，吃饭第一名',
    projectId: '1',
    position: 0,
  },
  {
    id: '2',
    title: '睡觉',
    status: TaskStatus.ACTIVE,
    content: '睡觉能治愈一切',
    projectId: '1',
    position: 0,
  },
  {
    id: '3',
    title: '打豆豆',
    status: TaskStatus.COMPLETED,
    content: '打的不是豆豆，是寂寞',
    projectId: '1',
    position: 0,
  },
]

export const useTasksStore = vi.fn(() => {
  return {
    findAllTasksNotRemoved() {
      // 将模拟的数据给返回出去
      return Promise.resolve(tasks)
    },
  }
})
