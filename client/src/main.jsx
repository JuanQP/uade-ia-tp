import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import { RouterProvider } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import { UserContextProvider } from './hooks/UserContext';
import { router } from './routes';
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <UserContextProvider>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </UserContextProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
