import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userFormSchema, UserFormData } from '../validationSchemas/userForm.schema'
import { User } from '@/api/interfaces/User'
import { useCreateUserMutation } from '@/api/hooks/useUsers'

interface UseUserFormProps {
  user?: User | null
  onCancel?: () => void
  onSuccess?: () => void
}

export const useUserForm = ({ user, onCancel, onSuccess }: UseUserFormProps) => {
  const isEditMode = !!user
  const createUser = useCreateUserMutation()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormData>({
    mode: 'onChange',
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      dateOfBirth: user?.dateOfBirth?.slice(0, 10) ?? '',
    },
  })

  const onSubmitHandler = async (data: UserFormData) => {
    try {
      const userData = {
        firstName: data.firstName || '',
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
      }
      if (isEditMode) {
        // TODO: useUpdateUser mutation
        console.log('Update user:', userData)
      } else {
        // Create new user
        await createUser.mutateAsync(userData)
        console.log('User created:', userData)
      }

      reset()
      onSuccess?.()
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  const onCancelHandler = () => {
    reset()
    onCancel?.()
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmitHandler),
    errors,
    isSubmitting: isSubmitting || createUser.isPending,
    isEditMode,
    onCancel: onCancelHandler,
    isError: createUser.isError,
    error: createUser.error,
  }
}
