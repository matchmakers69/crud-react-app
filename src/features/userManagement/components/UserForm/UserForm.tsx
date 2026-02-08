import { Box, Typography, Stack, Alert, TextField, Button, Container, Paper } from '@mui/material'
import { User } from '@/api/interfaces/User'
import { useUserForm } from '../../hooks/useUserForm'

interface UserFormProps {
  user?: User | null
  onCancel?: () => void
  onSuccess?: () => void
}

const UserForm = ({ user, onCancel, onSuccess }: UserFormProps) => {
  const {
    register,
    watch,
    handleSubmit,
    errors,
    isSubmitting,
    isEditMode,
    onCancel: handleCancel,
    isError,
    error,
  } = useUserForm({
    user,
    onCancel,
    onSuccess,
  })

  return (
    <Container maxWidth="md">
      <Paper
        elevation={0}
        sx={{
          p: 4,
          backgroundColor: (theme) => theme.palette.grey[50],
          borderRadius: 2,
        }}
      >
        <Typography variant="h2" component="h2" gutterBottom>
          {isEditMode ? 'Edit User' : 'Add New User'}
        </Typography>

        {isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error instanceof Error ? error.message : 'Sorry, some error occurred'}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2, mb: 2 }}>
          <Stack spacing={3}>
            <TextField
              {...register('firstName')}
              label="First Name"
              fullWidth
              error={Boolean(errors.firstName)}
              helperText={errors.firstName?.message}
              slotProps={{
                inputLabel: {
                  shrink: !!watch('firstName'),
                },
              }}
            />

            <TextField
              {...register('lastName')}
              label="Last Name"
              fullWidth
              required
              error={Boolean(errors.lastName)}
              helperText={errors.lastName?.message}
              slotProps={{
                inputLabel: {
                  shrink: !!watch('lastName'),
                },
              }}
            />

            <TextField
              {...register('dateOfBirth')}
              label="Date of Birth"
              type="date"
              fullWidth
              required
              error={Boolean(errors.dateOfBirth)}
              helperText={errors.dateOfBirth?.message}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                type="button"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : isEditMode ? 'Save Changes' : 'Add User'}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Container>
  )
}

export default UserForm
