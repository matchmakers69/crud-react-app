import { UsersManagement } from '@/features/userManagement/components/UsersManagement'
import { AppProvider } from './providers/AppProvider'
import { MainLayout } from './components/layouts/MainLayout'

const App = () => {
  return (
    <AppProvider>
      <MainLayout>
        <UsersManagement />
      </MainLayout>
    </AppProvider>
  )
}

export default App
