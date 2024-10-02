import Login from "../components/auth/Login";
import ResetPassword from "../components/auth/ResetPassword";
import Signup from "../components/auth/Signup";
import Home from "../components/Home";
import ChatWindow from "../components/messaging/ChatWindow";
import Users from "../components/Users";
import ProtectedRoute from "./ProtectedRoute";
import ResetPasswordPage from "../components/auth/ResetPasswordPage";

const allRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/update-password/:userId/:token",
    element: <ResetPasswordPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "conversation/:userId/:otherUserId",
        element: <ChatWindow />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
];

export default allRoutes;