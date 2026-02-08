import { useState, useCallback } from 'react'
import { Divider } from '@mui/material'
import { UserForm } from '../UserForm'
import { UsersTable } from '../UsersTable'
import { User } from '@/api/interfaces/User'
import { useDeleteUserMutation } from '@/api/hooks/useUsers'

const UsersManagement = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const deleteUser = useDeleteUserMutation()

  const handleEdit = useCallback((user: User) => {
    setSelectedUser(user)
  }, [])

  const handleDelete = useCallback(
    (user: User) => {
      deleteUser.mutate(user.id)
    },
    [deleteUser],
  )

  const handleSuccess = useCallback(() => {
    setSelectedUser(null)
  }, [])

  const handleCancel = useCallback(() => {
    setSelectedUser(null)
  }, [])

  return (
    <>
      <UserForm user={selectedUser} onSuccess={handleSuccess} onCancel={handleCancel} />

      <Divider sx={{ my: 4 }} />

      <UsersTable
        onEdit={handleEdit}
        onDelete={handleDelete}
        deletingUserId={deleteUser.isPending ? deleteUser.variables : null}
      />
    </>
  )
}

export default UsersManagement
