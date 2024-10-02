import { Box, IconButton, Tooltip } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import useLogout from "../../hooks/useLogout";
import { Dispatch, SetStateAction } from "react";

interface LogoutButtonProps {
  setLogged: Dispatch<SetStateAction<boolean>>;
  setAdmin: Dispatch<SetStateAction<boolean>>;
}

const LogoutButton = ({setLogged, setAdmin}: LogoutButtonProps) => {
  const logout = useLogout();
  
  const hangleLogout = () => {
    setLogged(false);
    logout();
    setAdmin(false);
  }

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Logout">
            <IconButton onClick={hangleLogout} sx={{ p: 0 }}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
      </Box>
    </>
  )
}

export default LogoutButton;