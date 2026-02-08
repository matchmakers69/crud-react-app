import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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

export const useUsersQuery = () => {
  return useQuery({
    queryKey: USER_QUERY_KEYS.USER_LIST,
    queryFn: async (): Promise<User[]> => {
      const response = await fetch(`${API_URL}/users`)
      if (!response.ok) throw new Error('Failed to fetch users')
      return response.json()
    },
  })
}
export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<User> }): Promise<User> => {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed to update user')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.USER_LIST })
    },
  })
}

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete user')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.USER_LIST })
    },
  })
}
