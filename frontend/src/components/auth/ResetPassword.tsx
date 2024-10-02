import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";
import Auth from "./Auth";
import useResetPassword from "../../hooks/useResetPassword";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { useNotification } from "../../NotificationContext";

interface ResetPasswordRequest {
  email: string;
}

const ResetPassword = () => {
  const { requestPassswordReset } = useResetPassword();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { showNotification } = useNotification();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleSubmit = async (request: ResetPasswordRequest) => {
    try {
      await requestPassswordReset(request);
      showNotification("¡Correo de restablecimiento enviado! Por favor, revisa tu bandeja de entrada.", "success");
      navigate("/login");
    } catch {
      showNotification("Error al enviar el correo de restablecimiento. Por favor, inténtalo de nuevo.", "error");
    }
  };

  return (
    <>
      <Auth
        submitLabel="Forgot your password?"
        buttonLabel="Send Email"
        onSubmit={handleSubmit}
      >
        <Link to={"/login"} style={{ alignSelf: "center" }}>
          <MUILink component="span">Return to Login</MUILink>
        </Link>
        <Link to={"/register"} style={{ alignSelf: "center" }}>
          <MUILink component="span">Signup</MUILink>
        </Link>
      </Auth>
    </>
  );
};

export default ResetPassword;