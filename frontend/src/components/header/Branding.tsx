import { Typography } from '@mui/material'
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import router from '../../routes/router';

const Branding = () => {
  return (
    <>
      <QuickreplyIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        onClick={() => router.navigate('/login')}
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
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
    </>
  )
}

export default Branding