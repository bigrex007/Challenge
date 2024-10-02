import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";
import Auth from "./Auth";
import useLogin from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { useNotification } from "../../NotificationContext";

interface LoginRequest {
  email: string;
  password: string;
}

const Login = () => {
  const { login } = useLogin();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { showNotification } = useNotification();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleSubmit = async (request: LoginRequest) => {
    try {
      await login(request);
      showNotification("Login successful! Redirecting to home...", "success");
      navigate("/home");
    } catch {
      showNotification("Login failed! Please check your credentials.", "error");
    }
  };

  return (
    <>
      <Auth
        submitLabel="Sign In Your Account"
        buttonLabel="Login"
        onSubmit={handleSubmit}
      >
        <Link to={"/register"} style={{ alignSelf: "center" }}>
          <MUILink component="span">Signup</MUILink>
        </Link>
        <Link to={"/reset-password"} style={{ alignSelf: "center" }}>
          <MUILink component="span">Forgot your password?</MUILink>
        </Link>
      </Auth>
    </>
  );
};

export default Login;
