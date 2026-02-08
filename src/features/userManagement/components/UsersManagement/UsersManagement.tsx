import { useState, useCallback } from 'react'
import { UserForm } from '../UserForm'
import { User } from '@/api/interfaces/User'

const UsersManagement = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

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
    </>
  )
}

export default UsersManagement
