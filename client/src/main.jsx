import { router } from '@/routes';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { UserContextProvider } from '@hooks/UserContext';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from "react-router-dom";

const theme = createTheme({
  palette: {
    background: {
      default: '#e0e0e0',
      drawer: '#0F2027',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <UserContextProvider>
        <HelmetProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
          </ThemeProvider>
        </HelmetProvider>
      </UserContextProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
