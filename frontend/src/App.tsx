import { Container, createTheme, CssBaseline, Grid2, ThemeProvider, useMediaQuery } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { NotificationProvider } from './NotificationContext';
import router from './routes/router';
import Header from './components/header/Header';
import ChatList from './components/chat-list/ChatList';
import { useContext, useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },  
});

const App = () => {
  const [logged, setLogged] = useState(false);
  const { user } = useContext(AuthContext);
  const [admin, setAdmin] = useState(false);
  const [isChatListVisible, setIsChatListVisible] = useState(true);

  const isSmallScreen = useMediaQuery('(max-width:900px)');
  
  const isLargeScreen = useMediaQuery('(min-width:901px)');

  useEffect(() => {
    if (isSmallScreen) {
      setIsChatListVisible(false);
    }
  }, [isSmallScreen]);

  useEffect(() => {
    if (isLargeScreen) {
      setIsChatListVisible(true);
    }
  }, [isLargeScreen]);

  useEffect(() => {
    if (user) {
      setLogged(true);
      if (user.role === 'admin') {
        setAdmin(true);
      }
    }
  }, [user]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <NotificationProvider>
        <Header
          logged={logged}
          setLogged={setLogged}
          admin={admin}
          setAdmin={setAdmin}
          isChatListVisible={isChatListVisible}
          setIsChatListVisible={setIsChatListVisible}
        />
        <Grid2 container>
          {logged && !isSmallScreen && (
            <Grid2 size={3}>
              <ChatList />
            </Grid2>
          )}
          <Grid2 size={logged && !isSmallScreen ? 9 : 12}>
            <Container>
              <RouterProvider router={router} />
            </Container>
          </Grid2>
        </Grid2>
        {logged && isSmallScreen && (
          <Drawer
            variant="persistent"
            anchor="left"
            open={isChatListVisible}
            sx={{
              width: isChatListVisible ? '70vw' : '60vw',
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: isChatListVisible ? '70vw' : '60vw',
                overflowX: 'hidden',
              },
            }}
          >
            <ChatList />
          </Drawer>
        )}
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
