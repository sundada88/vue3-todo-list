import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useCommandModel } from '../commandModal'
import { useSetup } from '@/tests/helper'
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
  describe('test short cut', () => {
    beforeEach(() => {
      closeCommandModal()
      useSetup(() => {
        registerKeyboardShortcut()
      })
    })

    it('Command + k should triggher mac short cut', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'k',
        metaKey: true,
      })
      window.dispatchEvent(event)
      expect(showCommandModal.value).toBe(true)
    })
    it('Command + k should triggher mac short cut', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'k',
        ctrlKey: true,
      })
      window.dispatchEvent(event)
      expect(showCommandModal.value).toBe(false)
    })
  })
})
