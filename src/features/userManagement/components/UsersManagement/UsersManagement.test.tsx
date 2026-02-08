import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/test/test-utils'
import UsersManagement from './UsersManagement'

jest.mock('@/api/hooks/useUsers', () => ({
  useCreateUserMutation: () => ({
    mutateAsync: jest.fn().mockResolvedValue({ id: 'jfjvpfjv' }),
    isPending: false,
    isError: false,
    error: null,
  }),
}))

describe('UserManagement', () => {
  it('should render UserForm component', () => {
    renderWithProviders(<UsersManagement />)

    expect(screen.getByText('Add New User')).toBeVisible()
  })
})
