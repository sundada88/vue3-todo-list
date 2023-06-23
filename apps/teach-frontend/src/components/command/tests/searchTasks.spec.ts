import { beforeEach, describe, expect, it, vi } from 'vitest'

import { filteredTasks, resetSearchTasks, searchTasks } from '../searchTasks'
import { completeSmartProject } from '@/store'
vi.mock('@/store/tasks')
vi.mock('@/store/listProjects')

describe('test searchTasks', () => {
  beforeEach(() => {
    resetSearchTasks()
  })
  it('search task by title', async () => {
    const title = '吃饭'
    await searchTasks(title)
    expect(filteredTasks.value[0].item.title).toBe(title)
  })
  it('search task by description', async () => {
    const description = '睡觉'
    await searchTasks(description)
    expect(filteredTasks.value[0].item.desc).toBe('睡觉能治愈一切')
  })
  it('should be empty when input don\'t match char', async () => {
    const title = '社畜'
    await searchTasks(title)
    expect(filteredTasks.value.length).toBe(0)
  })
  it('should be smartProject when task\'s status is completed', async () => {
    const title = '睡觉'
    await searchTasks(title)
    expect(filteredTasks.value).toMatchInlineSnapshot(`
      [
        {
          "item": {
            "desc": "睡觉能治愈一切",
            "done": false,
            "from": {
              "id": "1",
              "name": "test 集合",
              "type": "listProject",
            },
            "id": "2",
            "title": "睡觉",
          },
          "refIndex": 1,
        },
      ]
    `)
    expect(filteredTasks.value[0].item.from!.type).toBe('listProject')
  })
  it('should be smartProject when task\'s status is completed', async () => {
    const title = '打豆豆'
    await searchTasks(title)
    expect(filteredTasks.value).toMatchInlineSnapshot(`
      [
        {
          "item": {
            "desc": "打的不是豆豆，是寂寞",
            "done": true,
            "from": {
              "name": "已完成",
              "type": "smartProject",
            },
            "id": "3",
            "title": "打豆豆",
          },
          "refIndex": 2,
        },
      ]
    `)
    expect(filteredTasks.value[0].item.from!.type).toBe(completeSmartProject.type)
  })
})
