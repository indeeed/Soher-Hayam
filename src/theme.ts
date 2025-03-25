// ב-theme.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.2s'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: 'all 0.3s'
        }
      }
    }
  },
  palette: {
    primary: {
      main: '#4a6bff',
    },
    secondary: {
      main: '#ff6b6b',
    },
  }
});