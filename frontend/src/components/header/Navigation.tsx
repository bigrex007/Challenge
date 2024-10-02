import { Box, Button } from '@mui/material';
import router from '../../routes/router';

interface NavigationProps {
  pages: string[];
}

const Navigation = ({ pages }: NavigationProps) => {

  const handleNavigation = (page: string) => {
    const path = `/${page.toLowerCase()}`;
    router.navigate(path);
  };

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => handleNavigation(page)}
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          {page}
        </Button>
      ))}
    </Box>
  );
};

export default Navigation;
