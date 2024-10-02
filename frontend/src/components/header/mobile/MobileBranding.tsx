import QuickreplyIcon from '@mui/icons-material/Quickreply';
import { Typography, Box } from '@mui/material';
import router from '../../../routes/router';

const MobileBranding = () => {
  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'none' },
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <QuickreplyIcon sx={{ mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        onClick={() => router.navigate('/login')}
        sx={{
          mr: 2,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          cursor: 'pointer',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        CHATTINI
      </Typography>
    </Box>
  );
};

export default MobileBranding;
