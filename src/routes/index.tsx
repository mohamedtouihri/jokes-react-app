import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import DashboardLayout from "../components/Layout/dashboardLayout";
import { ProtectedRoute } from "../components/protectedRoutes";
import { AuthProvider } from "../components/AuthContext";
import {
  DASHBORD,
  FULL_JOKES_ROUTE,
  HOME,
  LOGIN,
  NOTFOUND,
  REGISTER,
} from "../constants/routes/routes";
import Jokes from "../pages/Jokes";

export const router = createBrowserRouter([
  {
    path: HOME,
    element: <Home />,
  },
  {
    path: DASHBORD,
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      </AuthProvider>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: FULL_JOKES_ROUTE,
        element: <Jokes />,
      },
    ],
  },
  {
    path: LOGIN,
    element: <Login />,
  },
  {
    path: REGISTER,
    element: <Register />,
  },
  {
    path: NOTFOUND,
    element: <h1>Not found page</h1>,
  },
]);
