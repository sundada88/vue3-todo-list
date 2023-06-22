import { nextTick } from 'process'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import flushPromises from 'flush-promises'
import { inputStateMachine, isSearchCommand, resetSearch, search } from '../search'
import { resetSearchTasks, searchTasks } from '../searchTasks'
import { resetSearchCommands, searchCommands } from '../searchCommands'

async function flushWatch() {
  await flushPromises()
  vi.runAllTimers()
}

vi.mock('../searchCommands', async (importOriginal) => {
  const config = await importOriginal()
  return {
    ...config as any,
    searchCommands: vi.fn(),
    resetSearchCommands: vi.fn(),
  }
})

vi.mock('../searchTasks', async (importOriginal) => {
  const config = await importOriginal()
  return {
    ...config as any,
    searchTasks: vi.fn(),
    resetSearchTasks: vi.fn(),
  }
})

describe('test search', () => {
  beforeEach(() => {
    resetSearch()
    vi.useFakeTimers()
  })
  it('input normal content should trigger search task', async () => {
    search.value = 'a'
    expect(isSearchCommand.value).toBeFalsy()
    await flushWatch()
    expect(inputStateMachine.state.value).toBe('loading')
    expect(searchTasks).toHaveBeenCalledOnce()
    await flushPromises()
    expect(inputStateMachine.state.value).toBe('loadCompleted')
  })
  it('input special content like > should trigger search command', async () => {
    search.value = '>切换'
    expect(isSearchCommand.value).toBeTruthy()
    await flushWatch()
    expect(searchCommands).toHaveBeenCalledOnce()
    await flushWatch()
    expect(inputStateMachine.state.value).toBe('loadCompleted')
  })
  it('input empty should reset all state', () => {
    search.value = 'aaa'
    search.value = ''
    nextTick(() => {
      expect(inputStateMachine.state.value).toBe('waitingForInput')
      expect(resetSearchCommands).toHaveBeenCalled()
      expect(resetSearchTasks).toHaveBeenCalled()
    })
  })
})
