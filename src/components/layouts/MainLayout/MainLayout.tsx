import { BaseProps } from '../../../types/BaseProps'
import { Container, Paper, Typography, Box } from '@mui/material'

const MainLayout = ({ children }: BaseProps) => {
  return (
    <Container
      maxWidth="lg"
      component="main"
      role="main"
      sx={{
        padding: 4,
        minHeight: '100vh',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          padding: 4,
          backgroundColor: 'background.paper',
        }}
      >
        <Box component="header">
          <Typography
            variant="h1"
            sx={{
              marginBottom: 4,
              paddingBottom: 2,
              borderBottom: 1,
              borderColor: 'divider',
              color: 'text.primary',
              fontWeight: 500,
            }}
          >
            User Admin CRUD
          </Typography>
        </Box>
        <Box component="section" aria-label="User management">
          {children}
        </Box>
      </Paper>
    </Container>
  )
}

export default MainLayout
