import { createBrowserRouter } from "react-router-dom";
import HomeScreen from "../pages/HomeScreen";
import AuthLayout from "../layout/authLayout";
import LoginScreen from "../pages/auth/LoginScreen";
import RegisterScreen from "../pages/auth/RegisterScreen";
import PrivateRoute from "./privateRoute";
import OtpScreen from "../pages/auth/OtpScreen";
import ErrorScreen from "../static/error/ErrorScreen";
import RegisterNotification from "../pages/auth/RegisterNotification";

export const mainRouter = createBrowserRouter([
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <RegisterScreen />,
      },
      {
        // index: true,
        path: "login",
        element: <LoginScreen />,
      },
      {
        // index: true,
        path: "otp/:id",
        element: <OtpScreen />,
      },
      {
        // index: true,
        path: "notification",
        element: <RegisterNotification />,
      },
    ],
  },
  {
    index: true,
    path: "*",
    element: <ErrorScreen />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <HomeScreen />
      </PrivateRoute>
    ),
  },
]);
