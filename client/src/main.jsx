import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import { Dashboard } from './Pages/Dashboard';
import { Content } from './Pages/Content';
import { NewContent } from './Pages/Content/NewContent';
import { EditContent } from './Pages/Content/EditContent';
import { Carousel } from './Pages/Carousel';
import { NewCarousel } from './Pages/Carousel/NewCarousel';
import { EditCarousel } from './Pages/Carousel/EditCarousel';
import { Logout } from './Pages/Logout';
import { User } from './Pages/User';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />
  },
  {
    path: "/login",
    element: <App />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/contents",
    element: <Content />,
  },
  {
    path: "/contents/:id",
    element: <EditContent />,
  },
  {
    path: "/contents/new",
    element: <NewContent />,
  },
  {
    path: "/carousels",
    element: <Carousel />,
  },
  {
    path: "/carousels/:id",
    element: <EditCarousel />,
  },
  {
    path: "/carousels/new",
    element: <NewCarousel />,
  },
  {
    path: "/users",
    element: <User />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <RouterProvider router={router} />
    </SnackbarProvider>
  </React.StrictMode>
);
