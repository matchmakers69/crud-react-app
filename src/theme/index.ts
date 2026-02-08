import { createTheme } from '@mui/material/styles'
import { typography } from './typography'
import { palette } from './palette'

export const theme = createTheme({
  spacing: 8,
  typography,
  palette,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          '&:before': { boxSizing: 'border-box' },
          '&:after': { boxSizing: 'border-box' },
          boxSizing: 'border-box',
        },
        html: {
          fontSize: '62.5%',
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
          WebkitFontSmoothing: 'antialiased',
          textSizeAdjust: '100%',
        },
        body: {
          backgroundColor: palette.background.default,
          overflowX: 'hidden',
          width: '100%',
          height: '100%',
          padding: 0,
          margin: 0,
          color: palette.text.primary,
          fontSize: '1.6rem',
        },
      },
    },
  },
})
