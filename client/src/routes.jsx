import App from './App';
import { Home } from './Pages/Home';
import { Content } from './Pages/Content';
import { Carousel } from './Pages/Carousel';
import { User } from './Pages/User';
import { Logout } from './Pages/Logout';
import { NewContent } from './Pages/Content/NewContent';
import { EditContent } from './Pages/Content/EditContent';
import { NewCarousel } from './Pages/Carousel/NewCarousel';
import { EditCarousel } from './Pages/Carousel/EditCarousel';

import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

export const router = createBrowserRouter([
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
