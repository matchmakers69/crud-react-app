import { SxProps } from '@mui/material'
import { ReactNode } from 'react'

export type BaseProps<T = ReactNode> = {
  children?: T
  id?: string
  'data-testid'?: string
  sx?: SxProps
}
