import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { BaseProps } from '@/types/BaseProps'
import { useState } from 'react'
import { theme } from '@/theme'

const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  },
}

export const AppProvider = ({ children }: BaseProps) => {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: queryConfig }))

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
        {import.meta.env.DEV && <ReactQueryDevtools />}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
