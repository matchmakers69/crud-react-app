import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/test/test-utils'
import UsersManagement from './UsersManagement'

const mockUseUsersQuery = jest.fn()

jest.mock('@/api/hooks/useUsers', () => ({
  useCreateUserMutation: () => ({
    mutateAsync: jest.fn().mockResolvedValue({ id: 'jfjvpfjv' }),
    isPending: false,
    isError: false,
    error: null,
  }),
  useUsersQuery: () => mockUseUsersQuery(),
}))

const MOCK_USERS = [
  { id: '1', firstName: 'John', lastName: 'Doe', dateOfBirth: '1990-05-15' },
  { id: '2', firstName: 'Jane', lastName: 'Smith', dateOfBirth: '1985-03-20' },
]
const DEFAULT_QUERY_STATE = {
  data: MOCK_USERS,
  isLoading: false,
  isError: false,
  error: null,
}

describe('UserManagement', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseUsersQuery.mockReturnValue(DEFAULT_QUERY_STATE) // Be dafault we return sussess state
  })
  describe('Rendering', () => {
    it('should render UserForm component', () => {
      renderWithProviders(<UsersManagement />)

      expect(screen.getByText('Add New User')).toBeVisible()
    })
    it('should render UsersTable components', () => {
      renderWithProviders(<UsersManagement />)

      expect(screen.getByRole('columnheader', { name: /First Name/i })).toBeVisible()
      expect(screen.getByRole('columnheader', { name: /Last Name/i })).toBeVisible()
      expect(screen.getByRole('columnheader', { name: /Date of Birth/i })).toBeVisible()
      expect(screen.getByRole('columnheader', { name: /Actions/i })).toBeVisible()
    })

    it('should display users from API', () => {
      renderWithProviders(<UsersManagement />)

      expect(screen.getByText('John')).toBeVisible()
      expect(screen.getByText('Doe')).toBeVisible()
      expect(screen.getByText('Jane')).toBeVisible()
      expect(screen.getByText('Smith')).toBeVisible()
    })
  })

  describe('States - loading, error, empty', () => {
    it('should display loading spinner while fetching users', () => {
      mockUseUsersQuery.mockReturnValue({
        ...DEFAULT_QUERY_STATE,
        data: undefined,
        isLoading: true,
      })

      renderWithProviders(<UsersManagement />)

      expect(screen.getByRole('progressbar')).toBeVisible()
    })
    it('should display error message when fetch fails', () => {
      mockUseUsersQuery.mockReturnValue({
        ...DEFAULT_QUERY_STATE,
        data: undefined,
        isError: true,
        error: new Error('Network error'),
      })

      renderWithProviders(<UsersManagement />)

      expect(screen.getByText(/Failed to load users/i)).toBeVisible()
      expect(screen.getByText(/Network error/i)).toBeVisible()
    })
    it('should display message when no users found', () => {
      mockUseUsersQuery.mockReturnValue({
        ...DEFAULT_QUERY_STATE,
        data: [],
      })

      renderWithProviders(<UsersManagement />)

      expect(screen.getByText(/No users found/i)).toBeVisible()
    })
  })
})
