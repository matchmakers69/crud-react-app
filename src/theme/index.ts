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
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: '8px 24px',
          fontSize: '1.6rem',
          fontWeight: 500,
          textTransform: 'none',
          borderRadius: 4,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 3px 0px rgb(0 0 0 / 35%)',
          },
          '&.Mui-disabled': {
            color: theme.palette.text.disabled,
            background: theme.palette.background.paper,
            boxShadow: 'unset',
          },
        }),
        containedPrimary: ({ theme }) => ({
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        }),
        containedSecondary: ({ theme }) => ({
          '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
          },
        }),
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: { fontSize: '1.4rem' },
        input: { fontSize: '1.4rem' },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontSize: '1.4rem' },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: { fontSize: '1.2rem' },
      },
    },
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
