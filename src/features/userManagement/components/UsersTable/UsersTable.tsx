import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Alert,
  Box,
  CircularProgress,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { User } from '@/api/interfaces/User'
import { useUsersQuery } from '@/api/hooks/useUsers'

interface UsersTableTableProps {
  onEdit?: (user: User) => void
  onDelete?: (user: User) => void
  deletingUserId?: string | null
}

const UsersTable = ({ onEdit, onDelete, deletingUserId }: UsersTableTableProps) => {
  const { data: users, isLoading, isError, error } = useUsersQuery()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB')
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={5}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return (
      <Alert severity="error">
        Failed to load users: {error instanceof Error ? error.message : 'Unknown error'}
      </Alert>
    )
  }

  if (!users || users.length === 0) {
    return <Alert severity="info">No users found</Alert>
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => {
            const isDeleting = deletingUserId === user.id
            return (
              <TableRow key={user.id} sx={{ opacity: isDeleting ? 0.5 : 1 }}>
                <TableCell>{user.firstName || '-'}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{formatDate(user.dateOfBirth)}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton
                      size="large"
                      color="primary"
                      onClick={() => onEdit?.(user)}
                      aria-label={`Edit user ${user.lastName}`}
                    >
                      <EditIcon fontSize="large" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="large"
                      color="error"
                      onClick={() => onDelete?.(user)}
                      aria-label={`Delete user ${user.lastName}`}
                    >
                      <DeleteIcon fontSize="large" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UsersTable
