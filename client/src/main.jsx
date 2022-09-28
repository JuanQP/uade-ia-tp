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
import { Dashboard } from './Pages/Dashboard';
import { Content } from './Pages/Content';
import { Carousel } from './Pages/Carousel';
import { LandingPage } from './Pages/LandingPage';
import { NewContent } from './Pages/Content/NewContent';
import { EditContent } from './Pages/Content/EditContent';

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
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/content",
    element: <Content />,
  },
  {
    path: "/content/:id",
    element: <EditContent />,
  },
  {
    path: "/content/new",
    element: <NewContent />,
  },
  {
    path: "/carousels",
    element: <Carousel />,
  },
  {
    path: "/landing-pages",
    element: <LandingPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
