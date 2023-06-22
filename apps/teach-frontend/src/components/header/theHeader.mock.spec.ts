import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useRouter } from 'vue-router'
import { useGoto } from './theHeader'

vi.mock('vue-router')

const pushFn = vi.fn()
// 通过 mock 的方式，返回一个假的 useRouter
// 测试其他路由的时候，还需要在写这一坨
vi.mocked(useRouter as () => { push: Function }).mockImplementation(() => {
  return {
    push: pushFn,
  }
})

describe('theHeader', () => {
  beforeEach(() => {
    pushFn.mockClear()
  })
  it('should be go to home page', () => {
    const { goToHome } = useGoto()

    goToHome()

    expect(pushFn).toBeCalledWith({ name: 'Home' })
  })

  it('should be go to settings page', () => {
    const { goToSettings } = useGoto()

    goToSettings()

    expect(pushFn).toBeCalledWith({ name: 'Settings' })
  })
})
