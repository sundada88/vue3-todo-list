import { vi } from 'vitest'
import type { ListProject } from '../listProjects'
import { TasksSelectorType } from '../tasksSelector'

export const useListProjectsStore = vi.fn(() => {
  return {
    findProject(): ListProject {
      return {
        id: '1',
        name: 'test 集合',
        type: TasksSelectorType.listProject,
      }
    },
  }
})
