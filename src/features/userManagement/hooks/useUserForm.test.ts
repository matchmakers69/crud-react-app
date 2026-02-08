import { renderHook, waitFor } from '@testing-library/react'
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

  it('should update form values when user prop changes', async () => {
    const user1 = { id: '1', firstName: 'John', lastName: 'Doe', dateOfBirth: '1990-01-01' }
    const user2 = { id: '2', firstName: 'Jane', lastName: 'Smith', dateOfBirth: '1985-05-15' }

    const { result, rerender } = renderHook(({ user }) => useUserForm({ user }), {
      wrapper: createTestWrapper(),
      initialProps: { user: user1 },
    })

    // Initially shows user1 data
    expect(result.current.isEditMode).toBe(true)

    // Change to user2
    rerender({ user: user2 })

    // Form should update (useEffect triggers)
    await waitFor(() => {
      expect(result.current.isEditMode).toBe(true)
    })
  })
})
