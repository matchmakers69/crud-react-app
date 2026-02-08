import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/test/test-utils'
import UsersTable from './UsersTable'
import userEvent from '@testing-library/user-event'

const mockUseUsersQuery = jest.fn()

jest.mock('@/api/hooks/useUsers', () => ({
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

describe('UsersTable', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseUsersQuery.mockReturnValue(DEFAULT_QUERY_STATE)
  })

  describe('Loading, Error, Empty states', () => {
    it('should display loading spinner when data is loading', () => {
      mockUseUsersQuery.mockReturnValue({
        ...DEFAULT_QUERY_STATE,
        data: undefined,
        isLoading: true,
      })

      renderWithProviders(<UsersTable />)

      expect(screen.getByRole('progressbar')).toBeVisible()
    })
    it('should display error message when fetch fails', () => {
      mockUseUsersQuery.mockReturnValue({
        ...DEFAULT_QUERY_STATE,
        data: undefined,
        isError: true,
        error: new Error('Network error'),
      })

      renderWithProviders(<UsersTable />)

      expect(screen.getByText(/Failed to load users/i)).toBeVisible()
      expect(screen.getByText(/Network error/i)).toBeVisible()
    })
    it('should display message when no users found', () => {
      mockUseUsersQuery.mockReturnValue({
        ...DEFAULT_QUERY_STATE,
        data: [],
      })

      renderWithProviders(<UsersTable />)

      expect(screen.getByText(/No users found/i)).toBeVisible()
    })
  })

  describe('User data rendering', () => {
    it('should render table with users', () => {
      renderWithProviders(<UsersTable />)

      expect(screen.getByText('First Name')).toBeVisible()
      expect(screen.getByText('Last Name')).toBeVisible()
      expect(screen.getByText('Date of Birth')).toBeVisible()
      expect(screen.getByText('Actions')).toBeVisible()

      expect(screen.getByText('John')).toBeVisible()
      expect(screen.getByText('Doe')).toBeVisible()
      expect(screen.getByText('Jane')).toBeVisible()
      expect(screen.getByText('Smith')).toBeVisible()
    })

    it('should display "-" for empty firstName', () => {
      mockUseUsersQuery.mockReturnValue({
        ...DEFAULT_QUERY_STATE,
        data: [
          ...MOCK_USERS,
          { id: '3', firstName: '', lastName: 'NoFirstName', dateOfBirth: '1990-01-01' },
        ],
      })

      renderWithProviders(<UsersTable />)

      expect(screen.getByText('NoFirstName')).toBeVisible()
      expect(screen.getByText('-')).toBeVisible()
    })
    it('should format date correctly', () => {
      mockUseUsersQuery.mockReturnValue({
        ...DEFAULT_QUERY_STATE,
        data: [{ id: '100', firstName: 'Test', lastName: 'User', dateOfBirth: '2000-12-25' }],
      })

      renderWithProviders(<UsersTable />)

      expect(screen.getByText('25/12/2000')).toBeVisible()
    })
  })

  describe('User interactions', () => {
    it('should call onEdit when edit button clicked', async () => {
      const onEdit = jest.fn()
      const user = userEvent.setup()

      renderWithProviders(<UsersTable onEdit={onEdit} />)

      const editButton = screen.getByLabelText('Edit user Doe')
      await user.click(editButton)

      expect(onEdit).toHaveBeenCalledTimes(1)
      expect(onEdit).toHaveBeenCalledWith(MOCK_USERS[0])
    })
    it('should call onDelete when delete button clicked', async () => {
      const onDelete = jest.fn()
      const user = userEvent.setup()

      renderWithProviders(<UsersTable onDelete={onDelete} />)

      const deleteButton = screen.getByLabelText('Delete user Doe')
      await user.click(deleteButton)

      expect(onDelete).toHaveBeenCalledTimes(1)
      expect(onDelete).toHaveBeenCalledWith(MOCK_USERS[0])
    })
  })
})
