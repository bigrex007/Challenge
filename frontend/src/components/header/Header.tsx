import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Branding from './Branding';
import MobileBranding from './mobile/MobileBranding';
import MobileNavigation from './mobile/MobileNavigation';
import LogoutButton from './LogoutButton';
import Navigation from './Navigation';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const userPages = ['Home'];
const adminPages = ['Home', 'Users'];

interface HeaderProps {
  logged: boolean;
  setLogged: Dispatch<SetStateAction<boolean>>;
  admin: boolean;
  setAdmin: Dispatch<SetStateAction<boolean>>;
  isChatListVisible: boolean;
  setIsChatListVisible: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ logged, setLogged, admin, setAdmin, isChatListVisible, setIsChatListVisible }: HeaderProps) => {
  const pages = admin ? adminPages : userPages;

  const isSmallScreen = useMediaQuery('(max-width:900px)');

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Branding />

          {logged && <MobileNavigation pages={pages} />}

          <MobileBranding />

          {logged && isSmallScreen && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={() => setIsChatListVisible((prev) => !prev)}
              sx={{ mr: 2 }}
            >
              {isChatListVisible ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          )}

          {logged && <Navigation pages={pages} />}

          {logged && <LogoutButton setLogged={setLogged} setAdmin={setAdmin}/>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
