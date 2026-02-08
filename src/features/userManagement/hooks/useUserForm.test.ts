import { renderHook } from '@testing-library/react'
import { act } from 'react'
import { useUserForm } from './useUserForm'
import { createTestWrapper } from '@/test/test-utils'

describe('useUserForm', () => {
  it('should initialize in create mode', () => {
    const { result } = renderHook(() => useUserForm({}), {
      wrapper: createTestWrapper(),
    })

    expect(result.current.isEditMode).toBe(false)
  })

  it('should initialize in edit mode when user provided', () => {
    const user = { id: '1', firstName: 'John', lastName: 'Doe', dateOfBirth: '1990-01-01' }

    const { result } = renderHook(() => useUserForm({ user }), {
      wrapper: createTestWrapper(),
    })

    expect(result.current.isEditMode).toBe(true)
  })

  it('should call onCancel callback', () => {
    const onCancel = jest.fn()

    const { result } = renderHook(() => useUserForm({ onCancel }), {
      wrapper: createTestWrapper(),
    })

    act(() => {
      result.current.onCancel()
    })

    expect(onCancel).toHaveBeenCalled()
  })
})
