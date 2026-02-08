import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import MainLayout from './MainLayout'
import { renderWithProviders } from '@/test/test-utils'

describe('MainLayout', () => {
  it('should render header with correct text', () => {
    renderWithProviders(
      <MainLayout>
        <div>Content</div>
      </MainLayout>,
    )

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('User Admin CRUD')
  })

  it('should render children inside section', () => {
    renderWithProviders(
      <MainLayout>
        <div>Test content</div>
      </MainLayout>,
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('should have correct semantic structure', () => {
    renderWithProviders(
      <MainLayout>
        <div>Content</div>
      </MainLayout>,
    )

    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByLabelText('User management')).toBeInTheDocument()
  })
})
