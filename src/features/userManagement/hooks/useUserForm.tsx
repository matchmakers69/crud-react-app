import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userFormSchema, UserFormData } from '../validationSchemas/userForm.schema'
import { User } from '@/api/interfaces/User'
import { useCreateUserMutation, useUpdateUserMutation } from '@/api/hooks/useUsers'
import { useEffect } from 'react'

interface UseUserFormProps {
  user?: User | null
  onCancel?: () => void
  onSuccess?: () => void
}

export const useUserForm = ({ user, onCancel, onSuccess }: UseUserFormProps) => {
  const isEditMode = !!user
  const createUser = useCreateUserMutation()
  const updateUser = useUpdateUserMutation()

  const {
    register,
    handleSubmit,
    watch,
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

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        dateOfBirth: user.dateOfBirth?.slice(0, 10) ?? '',
      })
    } else {
      reset({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
      })
    }
  }, [user, reset])

  const onSubmitHandler = async (data: UserFormData) => {
    try {
      const userData = {
        firstName: data.firstName || '',
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
      }
      if (isEditMode && user) {
        await updateUser.mutateAsync({ id: user.id, data: userData })
      } else {
        await createUser.mutateAsync(userData)
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
    watch,
    handleSubmit: handleSubmit(onSubmitHandler),
    errors,
    isSubmitting: isSubmitting || createUser.isPending || updateUser.isPending,
    isEditMode,
    onCancel: onCancelHandler,
    isError: createUser.isError || updateUser.isError,
    error: createUser.error || updateUser.error,
  }
}
