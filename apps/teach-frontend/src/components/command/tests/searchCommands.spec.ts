import { beforeEach, describe, expect, it } from 'vitest'
import { commands, filteredCommands, resetSearchCommands, searchCommands } from '../searchCommands'
import { useGoto } from '../../../composables/index'
import { useSetup } from '@/tests/helper/component'

describe('test searchCommands', () => {
  beforeEach(() => {
    resetSearchCommands()
  })
  it('input 切 should list first command', () => {
    searchCommands('>切')
    expect(filteredCommands.value[0]).toEqual(commands[0])
    const { router } = useSetup(() => {
      filteredCommands.value[0].execute(useGoto())
    })
    expect(router.push).toBeCalledWith({ name: 'Settings' })
  })
  it('imput 前 should list second command', () => {
    searchCommands('>前')
    expect(filteredCommands.value[0]).toEqual(commands[1])
    const { router } = useSetup(() => {
      filteredCommands.value[0].execute(useGoto())
    })
    expect(router.push).toBeCalledWith({ name: 'Home' })
  })
})
