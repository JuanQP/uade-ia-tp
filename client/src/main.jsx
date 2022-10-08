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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
