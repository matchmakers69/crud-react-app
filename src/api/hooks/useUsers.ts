import { useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from '../interfaces/User'
import { API_URL } from '@/config/api'
import { USER_QUERY_KEYS } from '@/config/queryKeys'

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userData: Omit<User, 'id'>): Promise<User> => {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })
      if (!response.ok) throw new Error('Failed to create user')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.USER_LIST })
    },
  })
}
