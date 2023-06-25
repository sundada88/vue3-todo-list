import { beforeEach, describe, expect, it, vi } from 'vitest'

import { computed } from 'vue'
import { useCommandModel } from '../commandModal'
import { useSetup } from '@/tests/helper'
// import * as useMisc from '@/composables/misc'
import { useIsMac } from '@/composables/misc'
const { showCommandModal, openCommandModal, closeCommandModal, registerKeyboardShortcut } = useCommandModel()

vi.mock('@/composables/misc')

describe('test open command', () => {
  beforeEach(() => {
    closeCommandModal()
  })
  it('should open command', () => {
    openCommandModal()
    expect(showCommandModal.value).toBe(true)
  })
  it('should close command', () => {
    closeCommandModal()
    expect(showCommandModal.value).toBe(false)
  })
  // TODO: 模拟键盘事件
  describe('test short cut in mac/window', () => {
    it('Command + k should triggher mac short cut', () => {
      vi.mocked(useIsMac).mockReturnValue(computed(() => true))
      useSetup(() => {
        registerKeyboardShortcut()
      })
      const event = new KeyboardEvent('keydown', {
        key: 'k',
        metaKey: true,
      })
      window.dispatchEvent(event)
      expect(showCommandModal.value).toBe(true)
    })

    it('Control + k should triggher windows short cut', () => {
      // vi.spyOn(useMisc, 'useIsMac').mockImplementation(() => computed(() => false))
      vi.mocked(useIsMac).mockReturnValue(computed(() => false))
      useSetup(() => {
        registerKeyboardShortcut()
      })
      const event = new KeyboardEvent('keydown', {
        key: 'k',
        ctrlKey: true,
      })
      window.dispatchEvent(event)
      expect(showCommandModal.value).toBe(true)
    })
  })
})
