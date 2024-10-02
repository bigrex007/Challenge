import { useContext } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { AuthContext } from '../AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <Container
      maxWidth="md"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        textAlign: 'center',
        p: 3,
      }}
    >
      <Box>
        <Typography variant="h2" gutterBottom>
          Welcome to Chattini, {user?.username}!
        </Typography>

        <Typography variant="h5" sx={{ mb: 4 }}>
          Connect and communicate with other users effortlessly.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Features
          </Typography>
          <Box sx={{ textAlign: 'left', mt: 2 }}>
            <Typography variant="h6">• Messaging</Typography>
            <Typography paragraph>
              Send and receive messages with other users in real-time.
            </Typography>

            <Typography variant="h6">• Notifications</Typography>
            <Typography paragraph>
              Get notified when you receive new messages or important updates.
            </Typography>

            <Typography variant="h6">• Password Reset</Typography>
            <Typography paragraph>
              Forgot your password? Reset it securely with our password reset feature.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            About Chattini
          </Typography>
          <Typography paragraph>
            Chattini is a user-friendly platform designed to facilitate seamless communication and user management. Whether you're connecting with friends, colleagues, or new acquaintances, Chattini provides the tools you need to stay connected.
          </Typography>
        </Box>

        <Box sx={{ mt: 5 }}>
          <Typography variant="caption" color="text.secondary">
            &copy; {new Date().getFullYear()} Chattini. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
