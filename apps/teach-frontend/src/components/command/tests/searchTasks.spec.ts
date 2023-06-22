import { beforeEach, describe, expect, it, vi } from 'vitest'

import { filteredTasks, resetSearchTasks, searchTasks } from '../searchTasks'
vi.mock('@/store/tasks')
vi.mock('@/store/listProjects')

describe('test searchTasks', () => {
  beforeEach(() => {
    resetSearchTasks()
  })
  it('should', async () => {
    await searchTasks('test')
    expect(filteredTasks).toMatchInlineSnapshot()
  })
})
