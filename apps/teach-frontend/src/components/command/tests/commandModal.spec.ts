import { beforeEach, describe, expect, it } from 'vitest'

import { useCommandModel } from '../commandModal'
import { useSetup } from '@/tests/helper'
const { showCommandModal, openCommandModal, closeCommandModal, registerKeyboardShortcut } = useCommandModel()

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
  it('should has short cut', () => {
    useSetup(() => {
      registerKeyboardShortcut()
    })
  })
})
