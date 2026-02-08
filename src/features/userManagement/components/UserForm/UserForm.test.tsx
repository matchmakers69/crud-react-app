import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UserForm from './UserForm'
import { renderWithProviders } from '@/test/test-utils'

jest.mock('@/api/hooks/useUsers', () => ({
  useCreateUserMutation: () => ({
    mutateAsync: jest.fn().mockResolvedValue({ id: 'ru304fg8' }),
    isPending: false,
    isError: false,
    error: null,
  }),
  useUpdateUserMutation: () => ({
    mutateAsync: jest.fn().mockResolvedValue({ id: 'ru304fg8' }),
    isPending: false,
    isError: false,
    error: null,
  }),
}))

const MOCK_USER = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '1990-05-15',
}

describe('UserForm', () => {
  describe('Create mode', () => {
    it('should render form with all fields', () => {
      renderWithProviders(<UserForm />)

      expect(screen.getByLabelText(/First Name/i)).toBeVisible()
      expect(screen.getByLabelText(/Last Name/i)).toBeVisible()
      expect(screen.getByLabelText(/Date of Birth/i)).toBeVisible()
      expect(screen.getByRole('button', { name: /Cancel/i })).toBeVisible()
      expect(screen.getByRole('button', { name: /Add User/i })).toBeVisible()
      expect(screen.getByText('Add New User')).toBeVisible()
    })

    it('should show validation error for empty last name', async () => {
      const user = userEvent.setup()
      renderWithProviders(<UserForm />)

      const submitButton = screen.getByRole('button', { name: /Add User/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/Last name is required/i)).toBeVisible()
      })
    })

    it('should show validation error for future date of birth', async () => {
      const user = userEvent.setup()
      const futureDate = new Date()
      futureDate.setFullYear(futureDate.getFullYear() + 1)
      const futureDateString = futureDate.toISOString().split('T')[0]

      renderWithProviders(<UserForm />)

      const lastNameInput = screen.getByLabelText(/Last Name/i)
      await user.type(lastNameInput, 'Doe')

      const dateInput = screen.getByLabelText(/Date of Birth/i)
      await user.type(dateInput, futureDateString)

      const submitButton = screen.getByRole('button', { name: /Add User/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/Date of birth cannot be in the future/i)).toBeVisible()
      })
    })

    it('should accept empty first name (optional field)', async () => {
      const handleSuccess = jest.fn()
      const user = userEvent.setup()

      renderWithProviders(<UserForm onSuccess={handleSuccess} />)

      const lastNameInput = screen.getByLabelText(/Last Name/i)
      await user.type(lastNameInput, 'Doe')

      const dateInput = screen.getByLabelText(/Date of Birth/i)
      await user.type(dateInput, '1990-05-15')

      const submitButton = screen.getByRole('button', { name: /Add User/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(handleSuccess).toHaveBeenCalledTimes(1)
      })
    })

    it('should clear form after successful submission', async () => {
      const user = userEvent.setup()

      renderWithProviders(<UserForm />)

      const firstNameInput = screen.getByLabelText(/First Name/i) as HTMLInputElement
      const lastNameInput = screen.getByLabelText(/Last Name/i) as HTMLInputElement
      const dateInput = screen.getByLabelText(/Date of Birth/i) as HTMLInputElement

      await user.type(firstNameInput, 'John')
      await user.type(lastNameInput, 'Doe')
      await user.type(dateInput, '1990-05-15')

      expect(firstNameInput.value).toBe('John')
      expect(lastNameInput.value).toBe('Doe')
      expect(dateInput.value).toBe('1990-05-15')

      const submitButton = screen.getByRole('button', { name: /Add User/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(firstNameInput.value).toBe('')
        expect(lastNameInput.value).toBe('')
        expect(dateInput.value).toBe('')
      })
    })

    it('should call onSuccess callback after submission', async () => {
      const handleSuccess = jest.fn()
      const user = userEvent.setup()

      renderWithProviders(<UserForm onSuccess={handleSuccess} />)

      await user.type(screen.getByLabelText(/Last Name/i), 'TestUser')
      await user.type(screen.getByLabelText(/Date of Birth/i), '1990-01-01')
      await user.click(screen.getByRole('button', { name: /Add User/i }))

      await waitFor(() => {
        expect(handleSuccess).toHaveBeenCalledTimes(1)
      })
    })

    it('should call onCancel callback', async () => {
      const handleCancel = jest.fn()
      const user = userEvent.setup()

      renderWithProviders(<UserForm onCancel={handleCancel} />)

      const cancelButton = screen.getByRole('button', { name: /Cancel/i })
      await user.click(cancelButton)

      expect(handleCancel).toHaveBeenCalledTimes(1)
    })
  })

  describe('Edit mode', () => {
    it('should display "Edit User" title', () => {
      renderWithProviders(<UserForm user={MOCK_USER} />)

      expect(screen.getByText('Edit User')).toBeVisible()
      expect(screen.queryByText('Add New User')).not.toBeInTheDocument()
    })
    it('should pre-fill form fields with user data', () => {
      renderWithProviders(<UserForm user={MOCK_USER} />)

      const firstNameInput = screen.getByLabelText(/First Name/i) as HTMLInputElement
      const lastNameInput = screen.getByLabelText(/Last Name/i) as HTMLInputElement
      const dateInput = screen.getByLabelText(/Date of Birth/i) as HTMLInputElement

      expect(firstNameInput.value).toBe('John')
      expect(lastNameInput.value).toBe('Doe')
      expect(dateInput.value).toBe('1990-05-15')
    })
    it('should call onSuccess after successful update', async () => {
      const handleSuccess = jest.fn()
      const user = userEvent.setup()

      renderWithProviders(<UserForm user={MOCK_USER} onSuccess={handleSuccess} />)

      // Change lastName
      const lastNameInput = screen.getByLabelText(/Last Name/i)
      await user.clear(lastNameInput)
      await user.type(lastNameInput, 'Smith')

      const submitButton = screen.getByRole('button', { name: /Save Changes/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(handleSuccess).toHaveBeenCalledTimes(1)
      })
    })
    it('should validate form in edit mode', async () => {
      const user = userEvent.setup()

      renderWithProviders(<UserForm user={MOCK_USER} />)

      const lastNameInput = screen.getByLabelText(/Last Name/i)
      await user.clear(lastNameInput)

      const submitButton = screen.getByRole('button', { name: /Save Changes/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/Last name is required/i)).toBeInTheDocument()
      })
    })

    it('should call onCancel in edit mode', async () => {
      const handleCancel = jest.fn()
      const user = userEvent.setup()

      renderWithProviders(<UserForm user={MOCK_USER} onCancel={handleCancel} />)

      const cancelButton = screen.getByRole('button', { name: /Cancel/i })
      await user.click(cancelButton)

      expect(handleCancel).toHaveBeenCalledTimes(1)
    })
  })
})
