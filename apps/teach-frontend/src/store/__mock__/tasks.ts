import { vi } from 'vitest'
import type { Task } from '../tasks'
import { TaskStatus } from '../tasks'

const tasks: Task[] = [
  {
    id: '1',
    title: 'test1',
    status: TaskStatus.ACTIVE,
    content: '这是第一条测试数据 test1',
    projectId: '1',
    position: 0,
  },
  {
    id: '2',
    title: 'test2',
    status: TaskStatus.ACTIVE,
    content: '这是第一条测试数据 test2',
    projectId: '1',
    position: 0,
  },
  {
    id: '3',
    title: 'test3',
    status: TaskStatus.ACTIVE,
    content: '这是第一条测试数据 test3',
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
