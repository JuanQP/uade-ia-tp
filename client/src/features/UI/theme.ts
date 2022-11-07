import { createTheme } from "@mui/material";

const SUCCESS_GRADIENT = 'linear-gradient(to right, #00F260, #0575E6)';

export const theme = createTheme({
  palette: {
    background: {
      default: '#e0e0e0',
      drawer: '#0F2027',
      loginOk: '#03B1A6',
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'gradient-success' },
          style: ({ theme }) => ({
            background: SUCCESS_GRADIENT,
            color: theme.palette.common.white,
            '&.Mui-disabled': {
              background: 'unset',
              backgroundColor: theme.palette.action.disabledBackground,
            }
          })
        },
      ]
    }
  }
});
