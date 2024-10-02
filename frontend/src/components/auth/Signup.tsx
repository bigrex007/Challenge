import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";
import Auth from "./Auth";
import useSignup from "../../hooks/useSignup";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../AuthContext";
import { useNotification } from "../../NotificationContext";

interface SignupRequest {
  email: string;
  password: string;
  username?: string;
}

const Signup = () => {
  const { signup } = useSignup();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { showNotification } = useNotification();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleSubmit = async (request: SignupRequest) => {
    try {
      await signup(request);
      showNotification("Signup successful! Redirecting to home...", "success");
      navigate("/home");
    } catch {
      showNotification("Signup failed! Username or Email already exist.", "error");
    }
  };

  return (
    <>
      <Auth
        submitLabel="Create an Account"
        buttonLabel="Submit"
        onSubmit={handleSubmit}
        error={""}
      >
        <Link to={"/login"} style={{ alignSelf: "center" }}>
          <MUILink  component="span">Login</MUILink>
        </Link>
      </Auth>
    </>
  );
};

export default Signup;    