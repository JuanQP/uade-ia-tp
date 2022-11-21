import { Layout } from '@features/UI';
import { Carousel } from '@pages/Carousel';
import { Content } from '@pages/Content';
import { CreateCarousel } from '@pages/CreateCarousel';
import { CreateContent } from '@pages/CreateContent';
import { EditCarousel } from '@pages/EditCarousel';
import { EditContent } from '@pages/EditContent';
import { Home } from '@pages/Home';
import { Login } from '@pages/Login';
import { Logout } from '@pages/Logout';
import { Register } from '@pages/Register';
import { Users } from '@pages/Users';
import {
  createBrowserRouter,
  Navigate
} from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />
  },
  {
    path: "/login",
    element: <Login />,
  },
  // All this routes have a layout
  {
    element: <Layout />,
    children: [
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/home",
        element: <Home />,
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
        element: <CreateContent />,
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
        element: <CreateCarousel />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ]
  },
]);
