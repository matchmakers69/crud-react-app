import { useState, useCallback } from 'react'
import { Divider } from '@mui/material'
import { UserForm } from '../UserForm'
import { UsersTable } from '../UsersTable'
import { User } from '@/api/interfaces/User'

const UsersManagement = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const handleEdit = useCallback((user: User) => {
    console.log('Edit user:', user)
    setSelectedUser(user)
  }, [])

  const handleDelete = useCallback((user: User) => {
    console.log('Delete user:', user)
  }, [])

  const handleSuccess = useCallback(() => {
    console.log('Form submitted successfully')
    setSelectedUser(null)
  }, [])

  const handleCancel = useCallback(() => {
    console.log('Form cancelled')
    setSelectedUser(null)
  }, [])

  return (
    <>
      <UserForm user={selectedUser} onSuccess={handleSuccess} onCancel={handleCancel} />

      <Divider sx={{ my: 4 }} />

      <UsersTable onEdit={handleEdit} onDelete={handleDelete} />
    </>
  )
}

export default UsersManagement
